import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import Image from 'next/image'




const inter = Inter({ subsets: ['latin'] })

import GlobalConifg from '../../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;




export const getStaticProps = async () =>{
    //---Slider Data API
    const MmCommitteeData = await fetch(process.env.API_URL+'/api/mm_committee');
    const MmData = await MmCommitteeData.json();
    
    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            MmData,
            ssData,
        },
    };
};


function displayHtml(htmlString) {
    return {__html: htmlString};
}

export default function MMD({MmData, ssData}) {
    return (
        <>
            <Head>
                <title>Monsoon Mission | Committees | MMD </title>
                <meta name="description" content="Ministry of Earth Sciences (MoES), Government of India has launched 'National Monsoon Mission' (NMM) with a vision to develop a state-of-the-art dynamical prediction system for monsoon rainfall on different time scales" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Rainfall, Weather, Climate" />
                <meta name="author" content="Indian Institute of Tropical Meteorology" />
                <link rel="icon" href="/img/mm-logo.png" />
                {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  /> */}
            </Head>
            
            {/* Header */}
            <Header ssData={ssData} />
            {/* Header */}


            {/* Page Header Start */}
            <div className="container-fluid bg-dark p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-5 text-white">Monsoon Mission Directorate</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <span>Committees</span>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/Committees/Monsoon-Mission-Directorate">MMD</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container-fluid bg-secondary p-0">
                <div className="row g-0 py-6 px-5">

                    {/* member-box start */}
                    {MmData?.map( (sd, i) => (
                        <div className="col-lg-4 " key={i}>
                            <div className="member-box">
                                <div className='row'>
                                    {sd.avatar?(
                                        <>
                                            <div className="avtar col-lg-5">
                                                <img src={API_URL_Local+'/'+sd.avatar} alt="" width="100%" />
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div className="avtar col-lg-5">
                                                <img src="/img/dummy-avatar.jpg" alt="" width="100%" />
                                            </div>
                                            
                                        </>
                                    )}
                                    
                                    <div className="description col-lg-7">
                                        <h2 className='title'>{sd.full_name}</h2>
                                        <div className='designation'>{sd.designation}</div>
                                        <div className='address'>
                                            {sd.inst_designation_n_name} 
                                            <span className='designation'>
                                                {sd.address}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/*  member-box end */}

                    {/* member-box start */}
                    {/* <div className="col-lg-4 ">
                        <div className="member-box">
                            <div className='row'>
                                <div className="avtar col-lg-6">
                                    <img src="/img/ssc/Dr_Shailesh_Nayak.jpg" alt="" width="100%" />
                                </div>
                                <div className="description col-lg-6">
                                    <h2 className='title'>Dr. Shailesh Nayak</h2>
                                    <div className='designation'>Co-Chair</div>
                                    <div className='address'>
                                    Director, NIAS, Bengaluru 
                                        <span className='designation'>
                                        NATIONAL INSTITUTE OF ADVANCED STUDIES (NIAS),
                                        Indian Institute of Science Campus,
                                        Bengaluru - 560012, Karnataka, INDIA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/*  member-box end */}

                    {/* member-box start */}
                    {/* <div className="col-lg-4 ">
                        <div className="member-box">
                            <div className='row'>
                                <div className="avtar col-lg-6">
                                    <img src="/img/ssc/Prof-Nanjundiah.jpg" alt="" width="100%" />
                                </div>
                                <div className="description col-lg-6">
                                    <h2 className='title'>Prof. Ravi S. Nanjundiah</h2>
                                    <div className='designation'>Member</div>
                                    <div className='address'>
                                    Chairman, SRMC, 
                                        <span className='designation'>
                                        1, Mount Poonamallee Rd, Sri Ramachandra Nagar, Chennai, Tamil Nadu 600116
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/*  member-box end */}

                    {/* member-box start */}
                    {/* <div className="col-lg-4 ">
                        <div className="member-box">
                            <div className='row'>
                                <div className="avtar col-lg-6">
                                    <img src="/img/ssc/Dr_Krishnan.jpg" alt="" width="100%" />
                                </div>
                                <div className="description col-lg-6">
                                    <h2 className='title'>Dr. R. Krishnan</h2>
                                    <div className='designation'>Member</div>
                                    <div className='address'>
                                    Director IITM, Pune & Monsoon Mission Director 
                                        <span className='designation'>
                                            Dr. Homi Bhabha Road, Pashan, Pune 411 008, Maharashtra, India
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/*  member-box end */}


                    
                    
                </div>
            </div>
            {/* About End */}

            {/* SSC Team */}
            


            
            

            {/* Footer Start */}
            <Footer ssData={ssData} />
            {/* Footer End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
        </>
    )
}