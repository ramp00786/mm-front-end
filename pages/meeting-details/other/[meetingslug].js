import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
//import logo from "./img/mm-logo.png";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import LoginWindow from '@/components/loginWindow'
import Documentsother from '@/components/documentsother';
import Image from 'next/image'
import { fetchData } from '../../utils/api';








// const MeetingDetails = () => {
//   const router = useRouter()
//   const { meetingslug } = router.query  
  
//   const ssData = fetch('/api/site-setting');
  
//   console.log(ssData);



import GlobalConifg from '../../../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

export async function getServerSideProps(context) {
    //---site setting Data API
    const { meetingslug } = context.query;

    const meetingInfo = await fetchData('/api/other-meeting-details?slug='+meetingslug);
    

    const ssData = await fetchData('/api/site-setting');
    

    // ---------------------------------------------------------------------------------------------
    
    
    // ---------------------------------------------------------------------------------------------

    return {
        props:{
            ssData,
            meetingInfo
        },
    };
};


function displayHtml(htmlString) {
    return {__html: htmlString};
}





export default function MeetingDetails({ssData, meetingInfo}) {

    const [userEmail, setUserEmail] = useState()
    const [userPassword, setuserPassword] = useState()
    const [loginstatus, setLoginStatus] = useState();

    const [meetingData, setMeetingData] = useState(null);

    const handleSubmit = async e => {
        // validate your userinfo
        e.preventDefault()
        
        const res = await signIn("credentials", {
          email: userEmail,
          password: userPassword,
          redirect: false
        })
        setLoginStatus(res.error);
    }

    function handleChangeEmail (newValue) {
        setUserEmail(newValue);
    }

    function handleChangePassword(newValue){
        setuserPassword(newValue);
    }

    // ---Get Slug from url
    const router = useRouter()
    const { meetingslug } = router.query 
    // ---Get Slug from url
    const session = useSession();


    // ---------------------------------------------------------------------------------------------
    async function getUser(token, meetingslug){
        //console.log(token);
        const meetingData = await fetch(API_URL_Local+'/api/other-meeting-documents?slug='+meetingslug, {headers:{
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token
        }});
        
        try {
            const jsondata =  await meetingData.json();
            setMeetingData(jsondata);
        } catch (e) {
            console.log(e)
        }

        
        
        //console.log(jsondata)
        
    }
    // ---------------------------------------------------------------------------------------------

    useEffect(()=>{
        if(session.status == 'authenticated'){
		    getUser(session?.data?.user?.email, meetingslug);
        }
	}, [session, meetingslug])

    
    
 
    

  return (
    
    <>
        
        <Head>
            <title>Monsoon Mission | { meetingslug } </title>
            <meta name="description" content="Ministry of Earth Sciences (MoES), Government of India has launched 'National Monsoon Mission' (NMM) with a vision to develop a state-of-the-art dynamical prediction system for monsoon rainfall on different time scales" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="Rainfall, Weather, Climate" />
            <meta name="author" content="Indian Institute of Tropical Meteorology" />
            <link rel="icon" href="../../img/mm-logo.png" />
            {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  /> */}
        </Head>


        {/* Header */}
        <Header  ssData={ssData} />
        {/* Header */}


        {/* Page Header Start */}
        <div className="container-fluid bg-dark p-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="display-5 text-white">{meetingInfo.heading}</h1>
                    {/* <span className='text-white'>Magna sea dolor ipsum amet lorem eos</span> */}
                    {/* <Link href="/">Home</Link>
                    <i className="fas fa-chevron-right text-primary px-2"></i>
                    <Link href={"/meeting-details/"+meetingslug} >About</Link> */}
                </div>
            </div>
        </div>
        {/* Page Header End */}


        {/* Blog Start */}
        <div className="container-fluid py-6 px-5">
            <div className="row g-5">
                <div className="col-lg-12 text-center">
                    
                </div>
                
                <div className='col-lg-6'>
                    <img className="img-fluid mb-5 meeting-single-main-image" src={API_URL_Local+'/'+meetingInfo.poster} alt="" />
                    <h1 className="mb-4">{meetingInfo.heading}</h1>
                    <div dangerouslySetInnerHTML={displayHtml(meetingInfo.smrc_description)}></div>
                </div>

                <div className='col-lg-6'>
                     {/* Agenda Start */}
                     <div className='col-12 d-flex justify-content-between'>
                        <h2 style={{marginTop: '-7px'}} className="mb-4">Documents</h2>

                        <Link className='flash-text fs-3 btn btn-primary' href={API_URL_Local+"/api/other-agenda?id="+meetingInfo.id}><i className='fa fa-file-pdf'></i> Agenda</Link>

                        
                    </div>
                    {/* Agenda end */}

                    {/* Category Start */}
                    <div className="mb-5">
                        
                        
                        <h2>{session?.data?.user?.other_meetings} </h2>
                        {session.status == 'authenticated'?(
                            <>
                                {session?.data?.user?.image.other_meetings?(
                                        <>
                                            {meetingData?(
                                                <>  
                                                    {/* {console.log(meetingData.meetingsData[0].users)} */}
                                                    {meetingData.meetingsData[0].users==null?(
                                                        <>
                                                            <Documentsother meetingData={meetingData} />
                                                        </>
                                                    ):(
                                                        <>
                                                            {console.log(session?.data?.user?.image.id)}
                                                            {/* {console.log(JSON.parse(meetingData?.meetingsData[0]?.users))}
                                                            {console.log(meetingData?.meetingsData[0]?.users.includes(2))} */}
                                                            {meetingData?.meetingsData[0]?.users.includes(session?.data?.user?.image.id)?(
                                                                <>
                                                                    <Documentsother meetingData={meetingData} />
                                                                </>
                                                            ):(
                                                                <>
                                                                    <div className="d-flex justify-content-end mb-2">
                                                                        <button className="btn btn-outline-success mx-2">{session?.data?.user?.name} </button>
                                                                        <button className="btn btn-sm btn-danger" onClick={signOut}>Logout</button>
                                                                    </div> 

                                                                    <div className="alert alert-danger" role="alert">
                                                                        You don&apos;t have permission to access this page.
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    
                                                </>
                                            ):(
                                                <>

                                                </>
                                            )}
                                            
                                        </>
                                ):(
                                        <>

                                            <div className="d-flex justify-content-end mb-2">
                                                <button className="btn btn-outline-success mx-2">{session?.data?.user?.name} </button>
                                                <button className="btn btn-sm btn-danger" onClick={signOut}>Logout</button>
                                            </div> 

                                            <div className="alert alert-danger" role="alert">
                                                You don&apos;t have permission to access this page.
                                            </div>
                                        </>
                                )}
                                
                            </>
                        ):(
                            <>  
                                
                                
                                <div className="row justify-content-md-center">
                                    
                                    <div className='col-lg-7'>
                                        <LoginWindow handleSubmit={handleSubmit} userEmail={userEmail} userPassword={userPassword} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} loginstatus={loginstatus} />
                                    </div>
                                    <div className='col-lg-5'></div>
                                </div>
                                    
                            </>
                        )}
                        
                    </div>
                    {/* Category End */}
                </div>

                {/* Sidebar Start */}
                <div className="col-lg-4">
                    

                   

                    

                    

                    

                    
                </div>
                {/* Sidebar End */}
            </div>
        </div>
        {/* Blog End */}


        {/* Footer Start */}
        <Footer  ssData={ssData} />
        {/* Footer End */}


        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  )
}

//export default MeetingDetails