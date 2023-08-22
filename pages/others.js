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
    //---MM Models Data API

    const dataRes = await fetch(process.env.API_URL+'/api/all-dynamic-pages');
    const data = await dataRes.json();

    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            ssData,
            data
        },
    };
};

export default function Models({ssData, data}) {
    return (
        <>
            <Head>
                <title>Monsoon Mission | Others </title>
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
                        <h1 className="display-4 text-white">Others</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/about-us">Model</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container p-4">
                <div className="row g-0">
                    <div className="col-lg-12 py-12 px-12">
                        <div className=''>
                            
                            {data?.map( (mmmData, i) => (
                                <div className='document-link'  key={i}>
                                    <Link href={'/pages/'+mmmData.slug}>
                                        <div className='link hvr-bounce-to-right'>{mmmData.heading}</div>
                                    </Link>
                                </div>
                            ) )}
                            
                            {/* <div dangerouslySetInnerHTML={displayHtml(mmModelData.description)}></div> */}
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