import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import { fetchData } from '../utils/api';
import GlobalConifg from '../../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

export async function getServerSideProps(context) {
    //---site setting Data API
    const { pageslug } = context.query;
    
    const pageData = await fetchData('/api/dynamic-page?slug='+pageslug);
    

    const ssData = await fetchData('/api/site-setting');
    

    // ---------------------------------------------------------------------------------------------
    
    
    // ---------------------------------------------------------------------------------------------

    return {
        props:{
            ssData,
            pageData,
            
        },
    };
};

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export default function DynamicPages({ssData, pageData}){
    
    
    return (
        <>
            <Head>
                <title>Monsoon Mission | About us </title>
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
                        <h1 className="display-4 text-white">
                            {pageData?.data?.heading?(
                                <>
                                    {pageData.data.heading}
                                </>
                            ):(
                                <>
                                    404!
                                </>
                            )}
                        </h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href={pageData?.data?.slug?'pages/'+pageData.data.slug: '#!'}>
                            {pageData?.data?.heading?(
                                    <>
                                        {pageData.data.heading}
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
                        {pageData?.data?.content?(
                            <>  
                                <div dangerouslySetInnerHTML={displayHtml(pageData.data.content)}></div>
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