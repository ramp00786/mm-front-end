import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
//import logo from "./img/mm-logo.png";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import LoginWindow from '@/components/loginWindow'
import Documentsactivity from '@/components/documentsactivity';
import { getSession } from "next-auth/react"

import GlobalConifg from '../../app.config'
import { fetchData } from '../utils/api';


const API_URL_Local = GlobalConifg.API_URL_Local;

export async function getServerSideProps(context) {
    //---site setting Data API
    const { activityid } = context.query;

    const dataInfo = await fetchData('/api/activity-details?id='+activityid);
    

    const ssData = await fetchData('/api/site-setting');
    

    // ---------------------------------------------------------------------------------------------
    
    
    // ---------------------------------------------------------------------------------------------

    return {
        props:{
            ssData,
            dataInfo
        },
    };
};


function displayHtml(htmlString) {
    return {__html: htmlString};
}

export default function ActivityInfo({ssData, dataInfo}){

    
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setuserPassword] = useState()
    const [loginstatus, setLoginStatus] = useState();

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

    const session = useSession();
    // ---Get Slug from url
    const router = useRouter()
    const { activityid } = router.query 
    // ---Get Slug from url
    
    //console.log(dataInfo.activityDetails);

    return (
        <>
            <Head>
                <title>Monsoon Mission | { dataInfo.ActivityHeading.heading } </title>
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
                        <h1 className="display-5 text-white">{ dataInfo.ActivityHeading.heading }</h1>
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
                    <div className='col-lg-12'>
                        {/* Activity data start */}
                        <div className="mb-5">
                            <div className="accordion" id="accordionExampleParent">
                                {dataInfo?.activityDetails?.map( (subHeading, i) =>(
                                    <div className="accordion-item" key={i}>
                                    <h2 className="accordion-header" id={'pheadingOne'+i} >
                                    <button className={i==0? "accordion-button ": "accordion-button collapsed" } type="button" data-bs-toggle="collapse" data-bs-target={'#pcollapseOne'+i} aria-expanded="true" aria-controls="collapseOne">
                                        {subHeading.sub_heading}
                                    </button>
                                    </h2>
                                    <div id={'pcollapseOne'+i} className={i==0? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="pheadingOne" data-bs-parent="#accordionExampleParent">
                                        <div className="accordion-body">
                                            {subHeading?.documents_details?.map( (docs, i) => (
                                                <div key={i}>
                                                    <Documentsactivity docs={docs} handleSubmit={handleSubmit} userEmail={userEmail} userPassword={userPassword} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} loginstatus={loginstatus} />
                                                </div>
                                            )) }
                                        </div>
                                    </div>
                                </div>
                                ) )}
                            </div> 
                        </div>
                        {/* Activity data  End */}
                    </div>
                </div>
            </div>
            {/* Blog End */}


            {/* Footer Start */}
            <Footer  ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
            
        </>
    );
}