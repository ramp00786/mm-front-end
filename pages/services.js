import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";




const inter = Inter({ subsets: ['latin'] })

const API_URL_Local = process.env.API_URL?process.env.API_URL:'http://127.0.0.1:8000';

export const getStaticProps = async () =>{
    //---Slider Data API
    const sliderData = await fetch(process.env.API_URL+'/api/slider');
    const dSlider = await sliderData.json();

    //---Welcome Section Data API
    const WSData = await fetch(process.env.API_URL+'/api/welcome-section');
    const dWS = await WSData.json();

    //---Welcome List Data API
    const WLData = await fetch(process.env.API_URL+'/api/welcome-list');
    const dWL = await WLData.json();

    //---Welcome List Data API
    const upmeRes = await fetch(process.env.API_URL+'/api/upcoming-meeting');
    const upmeData = await upmeRes.json();

    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            dSlider,
            dWS,
            dWL,
            upmeData,
            ssData,
        },
    };
};


function displayHtml(htmlString) {
    return {__html: htmlString};
}

export default function Services({dSlider, dWS, dWL, upmeData, ssData}) {
    return (
        <>
            <Head>
                <title>Monsoon Mission | Services</title>
                <meta name="description" content="Ministry of Earth Sciences (MoES), Government of India has launched 'National Monsoon Mission' (NMM) with a vision to develop a state-of-the-art dynamical prediction system for monsoon rainfall on different time scales" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Rainfall, Weather, Climate" />
                <meta name="author" content="Indian Institute of Tropical Meteorology" />
                <link rel="icon" href="img/mm-logo.png" />
                <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  />
            </Head>
            
            {/* Header */}
            <Header ssData={ssData} />
            {/* Header */}


            {/* Page Header Start */}
            <div className="container-fluid bg-dark p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4 text-white">Services</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/services">Services</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* Services Start */}
            <div className="container-fluid pt-6 px-5">
                <div className="text-center mx-auto mb-5" style={{maxWidth: "600px"}}>
                    <h1 className="display-5 mb-0">What We Offer</h1>
                    <hr className="w-25 mx-auto bg-primary" />
                </div>
                <div className="row g-5">
                    
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/data'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-user-tie fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Data</h3>
                                <p className="mb-0">Data Availability for Research Purpose</p>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/publications'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-chart-pie fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Publications</h3>
                                <p className="mb-0">IITM publications from Monsoon Mission Groups</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/activities'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-chart-line fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Activities</h3>
                                <p className="mb-0">IITM activities of the Monsoon Mission Groups</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/documents'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-chart-line fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Documents</h3>
                                <p className="mb-0">Documents of the Monsoon Mission</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/predictions'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-chart-area fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Prediction</h3>
                                <p className="mb-0">Monsoon Mission Indo-UK Scientific Colaboration</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/models'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-balance-scale fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Models</h3>
                                <p className="mb-0">Monsoon Mission models</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/workshop'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-cogs fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Research / Workshop</h3>
                                <p className="mb-0">Research / Workshop of the Monsoon Mission</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Link href={'/others'}>
                            <div className="service-item bg-secondary text-center px-5">
                                <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle mx-auto mb-4" style={{width: "90px", height: "90px"}}>
                                    <i className="fa fa-bars fa-2x"></i>
                                </div>
                                <h3 className="mb-3">Others</h3>
                                <p className="mb-0">Other activities, Documents, links etc.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div> 
            {/* Services End */}
            

            {/* Footer Start */}
            <Footer ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
        </>
    )
}