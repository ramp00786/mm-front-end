import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import Image from 'next/image'



const inter = Inter({ subsets: ['latin'] })

import GlobalConifg from '../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

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
    const Allmeetings = await fetch(process.env.API_URL+'/api/get-all-meetings-other');
    const AllM = await Allmeetings.json();

    return {
        props:{
            dSlider,
            dWS,
            dWL,
            upmeData,
            ssData,
            AllM,
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
    let heading3 = meeting.heading.replace('/',"-");
    let heading2 = heading3.replace('?', '');
    return 'meeting-details/'+meeting.meeting_of+'/'+meeting.id+'-'+dateString+'-'+heading2;
}

export default function OtherMeetings({dSlider, dWS, dWL, upmeData, ssData, AllM}) {
  return (
    <>
        <Head>
            <title>Monsoon Mission | Meetings</title>
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
                    <h1 className="display-4 text-white">Other Meetings</h1>
                    <Link href="/">Home</Link>
                    <i className="fas fa-chevron-right text-primary px-2"></i>
                    <Link href="/meetings">Other Meetings</Link>
                </div>
            </div>
        </div>
        {/* Page Header End */}


        

     


        


        {/* Blog Start */}
        <div className="container-fluid py-6 px-5">
            <div className="text-center mx-auto mb-5" style={{maxWidth: "600px"}}>
                <h1 className="display-5 mb-0">Other Meetings</h1>
                <hr className="w-25 mx-auto bg-primary" />
            </div>
            <div className="row g-5">

                {AllM.map( (meeting, i) => (
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
                ))}
                
                

                
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
