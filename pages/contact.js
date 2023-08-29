import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";


const inter = Inter({ subsets: ['latin'] });
const API_URL_Local = process.env.API_URL?process.env.API_URL:'http://127.0.0.1:8000';

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export const getStaticProps = async () =>{
    //---About us Data API
    const aboutUsData = await fetch(process.env.API_URL+'/api/about-us');
    const ausD = await aboutUsData.json();

    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            ssData,
            ausD
        },
    };
};

export default function About({ssData, ausD}) {
    return (
        <>
            <Head>
                <title>Monsoon Mission | Contact-us </title>
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
                        <h1 className="display-4 text-white">Contact Us</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/about-us">contact us</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container p-4">
                <div className="row g-0">
                    <div className="col-lg-12 py-12 px-12">
                        <div className='row'>
                            <div className='col-lg-4'>
                                <h2>Address</h2>
                                <p>
                                    <span className='institute-name'>Indian Institute of Tropical Meteorology</span><br/>
                                    Dr. Homi Bhabha Road, Pashan, <br/>
                                    Pune 411 008, Maharashtra, India <br/>
                                    
                                </p>
                            </div>
                            <div className='col-lg-4'>
                                <h2>Contacts</h2>
                                <ul>
                                    <li>Mail: <a href="mailto:monsoon_mission@tropmet.res.in">monsoon_mission@tropmet.res.in</a> </li>
                                    <li>Phone: +91-20-2590-4424</li>
                                    <li>Fax : +91-20-2586-5142</li>
                                </ul>
                            </div>
                            <div className='col-lg-4'>
                                <h2>Links</h2>
                                <ul>
                                    <li><a target='_blank' href="https://www.tropmet.res.in/">https://www.tropmet.res.in/</a> </li>
                                    <li><a target='_blank' href="https://tropmet.res.in/How%20to%20Reach-31-Page">How to reach</a> </li>
                                    
                                </ul>
                            </div>
                            <div className='col-lg-12'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15131.248204906016!2d73.8054335!3d18.5373936!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf6f00cdfb91%3A0xdbb0b78d0aa7a9c6!2sIndian%20Institute%20of%20Tropical%20Meteorology!5e0!3m2!1sen!2sin!4v1692682992781!5m2!1sen!2sin" width="100%" height="450" style={{border: '0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
            {/* About End */}


            
            

            {/* Footer Start */}
            <Footer ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
        </>
    )
}