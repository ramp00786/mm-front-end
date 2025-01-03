import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import Image from 'next/image'

import GlobalConifg from '../../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

export async function getServerSideProps(context) {
    //---site setting Data API
    const { slug } = context.query;
    
    const modelDataRes = await fetch(process.env.API_URL+'/api/mm-prediction?slug='+slug);
    const modelData = await modelDataRes?.json();

    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    // ---------------------------------------------------------------------------------------------
    
    
    // ---------------------------------------------------------------------------------------------

    return {
        props:{
            ssData,
            modelData,
            
        },
    };
};

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export default function DynamicPages({ssData, modelData}){
    
    
    return (
        <>
            <Head>
                <title>Monsoon Mission | Prediction  </title>
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
                        <h1 className="display-4 text-white">
                            {modelData?.data?.heading?(
                                <>
                                    {modelData.data.heading}
                                </>
                            ):(
                                <>
                                    404!
                                </>
                            )}
                        </h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href={modelData?.data?.slug?'pages/'+modelData.data.slug: '#!'}>
                            {modelData?.data?.heading?(
                                    <>
                                        {modelData.data.heading}
                                    </>
                                ):(
                                    <>
                                        404!
                                    </>
                                )}
                        </Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container p-4">
                <div className="row g-0">
                    <div className="col-lg-12 py-12 px-12">
                        {modelData?.data?.content?(
                            <>  
                                <div className='mm-prediction-div'>
                                    <h2>{modelData.data.heading}</h2>
                                    <div dangerouslySetInnerHTML={displayHtml(modelData.data.content)}></div>
                                </div>
                                
                            </>
                        ):(
                            <>
                                <div className='text-center page-404'>
                                    <h1>404!</h1>
                                    <p>Page not found.!</p>
                                </div>
                            </>
                        )}
                        {/* <div dangerouslySetInnerHTML={displayHtml(ausD.about_us)}></div> */}
                    </div>

                    

                    {/* <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='box'>
                                        <div className='box-heading'>
                                            <h2><i className='fa fa-cloud'></i></h2>
                                            <h2>Monsoon OnLine</h2>
                                        </div>
                                        <div className='box-body'>
                                            <p>
                                                At Monsoon OnLine (MOL) you can closely monitor the daily and weekly evolution of the monsoon.
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td rowspan="2">
                                    <img src="https://monsoon-mission.tropmet.res.in/dbtl1dt/uploads/others/06.jpg" alt="" width="100%" />
                                </td>
                                <td className='pl-4'>
                                    <div className='box pl-4'>
                                        <div className='box-heading'>
                                            <h2><i className='fa fa-th-large'></i></h2>
                                            <h2>Extended Range Prediction</h2>
                                        </div>
                                        <div className='box-body'>
                                            <p>
                                                At Monsoon OnLine (MOL) you can closely monitor the daily and weekly evolution of the monsoon.
                                            </p>
                                        </div>
                                    </div> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='box'>
                                        <div className='box-heading'>
                                            <h2><i className='fa fa-clock'></i></h2>
                                            <h2>Short Range Forecasts</h2>
                                        </div>
                                        <div className='box-body'>
                                            <p>
                                                At Monsoon OnLine (MOL) you can closely monitor the daily and weekly evolution of the monsoon.
                                            </p>
                                        </div>
                                    </div>  
                                </td>
                                
                                <td className='pl-4'> 
                                    <div className='box pl-4'>
                                        <div className='box-heading'>
                                            <h2><i className='fa fa-circle'></i></h2>
                                            <h2>Seasonal Forecasts</h2>
                                        </div>
                                        <div className='box-body'>
                                            <p>
                                                At Monsoon OnLine (MOL) you can closely monitor the daily and weekly evolution of the monsoon.
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                    
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