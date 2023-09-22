import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
//import logo from "./img/mm-logo.png";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import LoginWindow from '@/components/loginWindow'
import axios from 'axios';



import GlobalConifg from './app.config.js'


const API_URL_Local = GlobalConifg.API_URL_Local;

export async function getServerSideProps(context) {
    //---site setting Data API
    const { fileid } = context.query;

    const dataRes = await fetch(process.env.API_URL+'/api/file-details?id='+fileid);
    const dd = await dataRes.json();

    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();
    // ---------------------------------------------------------------------------------------------
    
    
    // ---------------------------------------------------------------------------------------------

    return {
        props:{
            ssData,
            dd
        },
    };
};


function fileExtension(docsInfo){
    let parts = docsInfo.split(".");
    return parts[1];
}

export default function File({ssData, dd}){

    //=============Login System start=============
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
     //=============Login System end=============
    const session = useSession();

    // ===============Download File==============
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const downloadFile = (event) =>{        
        if(session.status == 'authenticated'){
            setLoader(true);
            setError('');
            const token = session?.data?.user?.email;            
            const axiosConfig = {
                responseType: 'arraybuffer',
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get(API_URL_Local+'/api/rs-file-download?id='+event.target.id, axiosConfig)
            .then((response)=>{
                setLoader(false);
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', event.target.title);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error)=>{
                setLoader(false)
                setError(error.message)
            })
        }
        else{
            setLoader(false);
            setError('Please login first')
        }
    }
    // ===============Download File==============
    console.log(dd);

    return (
        <>
           <Head>
                <title>Monsoon Mission | {dd?.document_title} </title>
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
                        <h1 className="display-5 text-white">{dd?.document_title}</h1>
                        {/* <span className='text-white'>Magna sea dolor ipsum amet lorem eos</span> */}
                        {/* <Link href="/">Activities</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i> */}
                        <Link href="#!" >Download</Link>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container-fluid py-6 px-5">
                <div className="row g-5">
                    <div className="col-lg-12">
                    {session?.status == 'authenticated'?(
                        <>
                            <div className="row justify-content-md-center">
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4 text-center'>
                                    <Link className='btn btn-primary' href="#!" title={dd.document_title+'.'+fileExtension(dd.document_file)}  id={dd.id} onClick={downloadFile} >Download File</Link>
                                </div>
                                <div className='col-lg-4'></div>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="row justify-content-md-center">
                                <div className='col-lg-4'></div>
                                <div className='col-lg-4'>
                                    <LoginWindow handleSubmit={handleSubmit} userEmail={userEmail} userPassword={userPassword} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} loginstatus={loginstatus} />
                                </div>
                                <div className='col-lg-4'></div>
                            </div>
                        </>
                    )}
                    </div>
                </div>
            </div>


            {/* Footer Start */}
            <Footer  ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
            
        </>
    )
}

// Login check karna he
// File id query string me he
// File download ka button dikhana he
// Restricted document me se file download karwana he