import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";


const inter = Inter({ subsets: ['latin'] });
import GlobalConifg from '../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export const getStaticProps = async () =>{
    //---About us Data API
    const publicationsRes = await fetch(process.env.API_URL+'/api/publications');
    const pubData = await publicationsRes.json();

    //---site setting Data API
    const site_setting = await fetch(process.env.API_URL+'/api/site-setting');
    const ssData = await site_setting.json();

    return {
        props:{
            ssData,
            pubData
        },
    };
};

export default function About({ssData, pubData}) {
    return (
        <>
            <Head>
                <title>Monsoon Mission | Publications </title>
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
                        <h1 className="display-4 text-white">Publications</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/about-us">Publications</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container p-4">
                <div className="row g-0">
                    <div className="col-lg-12 py-12 px-12">
                        <h2 className="">{pubData?.publicationTitleDesc?.title}</h2>
                        <div dangerouslySetInnerHTML={displayHtml(pubData.publicationTitleDesc.description)}></div>

                        {pubData?.publication?.map( (pub, i) =>(
                            <div key={i}>
                                <h5 style={{marginBottom: '20px'}}><b>{pub.heading}</b></h5>
                                <div dangerouslySetInnerHTML={displayHtml(pub.description)}></div>
                            </div>

                        ) )}
                        
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