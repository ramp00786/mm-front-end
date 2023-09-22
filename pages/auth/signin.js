import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import LoginWindow from '@/components/loginWindow'
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Router from 'next/router';





const inter = Inter({ subsets: ['latin'] });
import GlobalConifg from './app.config.js'


const API_URL_Local = GlobalConifg.API_URL_Local;

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export const getStaticProps = async () =>{

    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            ssData,
        },
    };
};

export default function Signin({ssData}) {


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

    if(session?.status == 'authenticated'){
        Router.replace('/');
    }

    

    return (
        <>
            <Head>
                <title>Monsoon Mission | Login </title>
                <meta name="description" content="Ministry of Earth Sciences (MoES), Government of India has launched 'National Monsoon Mission' (NMM) with a vision to develop a state-of-the-art dynamical prediction system for monsoon rainfall on different time scales" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Rainfall, Weather, Climate" />
                <meta name="author" content="Indian Institute of Tropical Meteorology" />
                <link rel="icon" href="img/mm-logo.png" />
                {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  /> */}
            </Head>
            
            {/* Header */}
            <Header ssData={ssData} />
            {/* Header */}


            {/* Page Header Start */}
            <div className="container-fluid bg-dark p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4 text-white">Login</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/auth/signin">Login</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* LoginWindow Start */}
            <div className="row justify-content-md-center my-4">
                <div className='col-lg-4'></div>
                <div className='col-lg-4'>
                    <LoginWindow handleSubmit={handleSubmit} userEmail={userEmail} userPassword={userPassword} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} loginstatus={loginstatus} />
                </div>
                <div className='col-lg-4'></div>
                
            </div>
            {/* LoginWindow End */}


            
            

            {/* Footer Start */}
            <Footer ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
        </>
    )
}