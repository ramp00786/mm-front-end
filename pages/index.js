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


    //---Home page meetings
    const HPmeetings = await fetch(process.env.API_URL+'/api/home-page-meetings');
    const HPM = await HPmeetings.json();

    return {
        props:{
            dSlider,
            dWS,
            dWL,
            upmeData,
            ssData,
            HPM,
        },
    };
};


function displayHtml(htmlString) {
    return {__html: htmlString};
}

function getDateFromString(dateString, type){
    let dateStringArray = dateString.split('-');
    if(type == 'day'){
        return dateStringArray[2];
    }
    if(type == 'month'){
        return dateStringArray[1];
    }
    if(type == 'year'){
        return dateStringArray[0];
    }
    
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
}

function slipString(string, from, to){
    if(string.length>to){
        return string.substring(from,to)+'...';
    }
    else{
        return string.substring(from,to);
    }
}


function getSlugWithMeetingInfo(meeting){
    let dateString = getDateFromString(meeting.start_date, 'day')+'-'+getMonthName(getDateFromString(meeting.start_date, 'month'))+'-'+getDateFromString(meeting.start_date, 'year');
    let heading = meeting.heading.replace(/ /g,"-");
    let heading2 = heading.replace('?', '');
    return 'meeting-details/'+meeting.meeting_of+'/'+meeting.id+'-'+dateString+'-'+heading2;
}

export default function Home({dSlider, dWS, dWL, upmeData, ssData, HPM}) {
  return (
    <>
        <Head>
            <title>Monsoon Mission</title>
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


        {/* Carousel Start */}
        <div className="container-fluid p-0">
            <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                {dSlider.map((slider, i) => (
                    <div className={i == 0 ? "carousel-item active" : "carousel-item "} key={slider.id}>
                        <img className="w-100" src={API_URL_Local+"/"+slider.image} alt="Image" style={{height: "480px"}} />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{maxWidth: "900px"}}>                            
                                <h1 className="display-1 text-white mb-md-4">{slider.heading}</h1>
                                <h5 className="text-white mb-3rem">{slider.desc}</h5>
                                {/* <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 rounded-pill">Get Quote</a>
                                <a href="" className="btn btn-secondary py-md-3 px-md-5 rounded-pill">Contact Us</a> */}
                            </div>
                        </div>
                    </div>


                ))}
                    
                    {/* <div className="carousel-item ">
                        <img className="w-100" src="/img/carousel-2.jpg" alt="Image" />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" >
                                <h5 className="text-white text-uppercase">Business Consultancy</h5>
                                <h1 className="display-1 text-white mb-md-4">Take Our Help To Reach The Top Level</h1>
                                <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 rounded-pill">Get Quote</a>
                                <a href="" className="btn btn-secondary py-md-3 px-md-5 rounded-pill">Contact Us</a>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img className="w-100" src="/img/carousel-2.jpg" alt="Image" />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" >
                                <h5 className="text-white text-uppercase">Business Consultancy</h5>
                                <h1 className="display-1 text-white mb-md-4">Take Our Help To Reach The Top Level</h1>
                                <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 rounded-pill">Get Quote</a>
                                <a href="" className="btn btn-secondary py-md-3 px-md-5 rounded-pill">Contact Us</a>
                            </div>
                        </div>
                    </div> */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        {/* Carousel End */}


        {/* About Start */}
        <div className="container-fluid bg-secondary p-0">
            <div className="row g-0">
                <div className="col-lg-6 py-6 px-5">

                    <h1 className="display-5 mb-4" dangerouslySetInnerHTML={displayHtml(dWS.heading)}>
                    </h1>
                    <h4 className="text-primary mb-4">{dWS.tagline}</h4>
                    <p className="mb-4">{dWS.description}</p>
                    <Link href="about-us" className="btn btn-primary py-md-3 px-md-5 rounded-pill">Read More</Link>
                </div>
                <div className="col-lg-6">
                    <div className="h-100 d-flex flex-column justify-content-center bg-primary p-5">

                        {dWL.map( (item, k) => (
                            
                                <div className="d-flex text-white mb-5" key={k}>
                                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white text-primary rounded-circle mx-auto mb-4" style={{width: "60px", height: "60px"}}>
                                        <i className={item.icon+' fs-4'}></i>
                                    </div>
                                    <div className="ps-4">
                                        <h3>{item.title}</h3>
                                        <p className="mb-0">{item.description}</p>
                                    </div>
                                </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
        {/* About End */}

        {/* Quote Start */}
        <div className="container-fluid bg-secondary px-0 py-6">
            <div className="row g-0">
                <div className="col-lg-6 py-6 px-5">
                    <h1 className="display-5 mb-4">{upmeData.heading}</h1>
                    <p className="mb-4">{upmeData.description}</p>
                    {/* <form>
                        <div className="row gx-3">
                            <small>Get notification on email</small>
                            <div className="col-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="form-floating-1" placeholder="John Doe" />
                                    <label htmlFor="form-floating-1">Full Name</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="form-floating-2" placeholder="name@example.com" />
                                    <label htmlFor="form-floating-2">Email address</label>
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <button className="btn btn-primary w-100 h-100" type="submit">Subscribe Now</button>
                            </div>
                        </div>
                    </form> */}
                </div>
                <div className="col-lg-6" style={{minHeight: "400px"}}>
                    <div className="position-relative h-100">
                        <img className="position-absolute w-100 h-100" src={API_URL_Local+"/"+upmeData.banner} style={{objectFit: "cover"}} />
                    </div>
                </div>
            </div>
        </div>
        {/* Quote End */}


        


        {/* Blog Start */}
        <div className="container-fluid py-6 px-5">
            <div className="text-center mx-auto mb-5" style={{maxWidth: "600px"}}>
                <h1 className="display-5 mb-0">Previous Meetings</h1>
                <hr className="w-25 mx-auto bg-primary" />
            </div>
            <div className="row g-5">
                {HPM.map( (meeting, i) => (
                    <div className="col-lg-4" key={i}>
                        <div className="blog-item">
                            <div className="position-relative overflow-hidden">
                                <img className="img-fluid" src={API_URL_Local+'/'+meeting.poster} alt="poster" style={{width:580, height:370}} />
                            </div>
                            <div className="bg-secondary d-flex">
                                <div className="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                                    <span>{getDateFromString(meeting.start_date, 'day')}</span>
                                    <h5 className="text-uppercase m-0">{getMonthName(getDateFromString(meeting.start_date, 'month'))}</h5>
                                    <span>{getDateFromString(meeting.start_date, 'year')}</span>
                                </div>
                                <div className="d-flex flex-column justify-content-center py-3 px-4">
                                    <div className="d-flex mb-2">
                                        <Link href="#.">
                                            <small className="text-uppercase me-3"><i className="fa fa-check me-2"></i>Agenda</small>
                                        </Link>
                                        
                                        <small className="text-uppercase me-3"><i className="bi bi-bookmarks me-2"></i>{meeting.meeting_of}</small>
                                        
                                    </div>
                                    <Link className="h4" href={getSlugWithMeetingInfo(meeting)}>{slipString(meeting.heading, 0,32)}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) )}
                <div className="col-lg-12">
                    <Link href="meetings" className="btn btn-primary py-md-3 px-md-5 rounded-pill float-end">All Meetings</Link>
                </div>
            </div>
        </div>
        {/* Blog End */}
        

        {/* Footer Start */}
        <Footer ssData={ssData} />
        {/* Footer End */}


        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up"></i></a>
    </>
  )
}


