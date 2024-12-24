import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from "next/link";
import { useState} from "react"
import { fetchData } from './utils/api';
//import MaterialTable from 'material-table';


/*
* Tutorial of the Material Table
* https://www.youtube.com/watch?v=4TOONPrrlKY&list=PLqhnP4YYLcb7pDYWy_Y0baGkklpqXd9Sd&ab_channel=Codenemy
* Package: https://material-table.com/#/docs/get-started
*/



const inter = Inter({ subsets: ['latin'] });
import GlobalConifg from '../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

function displayHtml(htmlString) {
    return {__html: htmlString};
}

export const getStaticProps = async () =>{

    

    //---dataTableRes Data API
    const serverData = await fetchData('/api/scientific-data');
    
    //---dataTableRes Data API
    const dataDesc = await fetchData('/api/data-desc');
    
    //---site setting Data API
    const ssData = await fetchData('/api/site-setting');
    

    return {
        props:{
            ssData,
            serverData,
            dataDesc
        },
    };
};

export default function About({ssData, serverData, dataDesc}) {
    // const [tableData, setTableData] = useState([
    //     {name: "Raj", email:"raj@example.com", age:20, gender:'M'},
    //     {name: "sweety", email:"sweety@example.com", age:18, gender:'F'},
    //     {name: "Mohan", email:"mohan@example.com", age:30, gender:'M'},
    //     {name: "Suraj", email:"suraj@example.com", age:35, gender:'M'},
    //     {name: "Rubi", email:"rubi@example.com", age:25, gender:'F'},
    // ]);
    //const [tableData, setTableData] = useState(serverData.tableData);
    
    const columns =[
        {title: "Data Variable", field:"data_variable", render: (row) => {
            return <span dangerouslySetInnerHTML={{__html: row.data_variable}} />
        },},
        {title:"Period of the data", field:"period_of_the_data"},
        {title:"Frequency of Data", field:"frequency_of_data"},
        {title:"Expt. Name/Model Used", field:"expt_name_model_used", render: (row) => {
            return <span dangerouslySetInnerHTML={{__html: row.expt_name_model_used}} />
            },},
        {title:"Reference", field:"reference", render: (row) => {
            return <span dangerouslySetInnerHTML={{__html: row.reference}} />
            },},
        {title:"Remarks", field:"remarks", render: (row) => {
            return <span dangerouslySetInnerHTML={{__html: row.remarks}} />
            },},
        {title:"Is New", field: "is_new", lookup: {1: <span dangerouslySetInnerHTML={{__html: "<img style='width:50px' src='https://rajhindinews.com/wp-content/uploads/2018/09/new-gif-image.gif' />"}} />, 0: "No"}},
    ];
    return (
        <>
            <Head>
                <title>Monsoon Mission | Data </title>
                <meta name="description" content="Ministry of Earth Sciences (MoES), Government of India has launched 'National Monsoon Mission' (NMM) with a vision to develop a state-of-the-art dynamical prediction system for monsoon rainfall on different time scales" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Rainfall, Weather, Climate" />
                <meta name="author" content="Indian Institute of Tropical Meteorology" />
                <link rel="icon" href="img/mm-logo.png" />
                {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  /> */}
                {/* <link  rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
                
            </Head>
            
            {/* Header */}
            <Header ssData={ssData} />
            {/* Header */}


            {/* Page Header Start */}
            <div className="container-fluid bg-dark p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4 text-white">Data</h1>
                        <Link href="/">Home</Link>
                        <i className="fas fa-chevron-right text-primary px-2"></i>
                        <Link href="/data">Data</Link>
                        
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            {/* About Start */}
            <div className="container p-4">
                <div className="row g-0">
                    <div className="col-lg-12 py-12 px-12">
                        <div className='text-center mb-4'>
                            <h2 style={{color: '#ff3100'}}>{dataDesc.dataDesc.heading}</h2>
                            <p style={{color:'#760f2b'}}>{dataDesc.dataDesc.description}</p>
                        </div>
                        {/* <MaterialTable
                            title=""
                            columns={columns}
                            data={serverData.tableData}
                        /> */}

                        {console.log(serverData.tableData)}
                        
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Data Variable</th>
                                    <th>Period of the data</th>
                                    <th>Frequency of Data</th>
                                    <th>Expt. Name/Model Used</th>
                                    <th>Reference</th>
                                    <th>Remarks</th>
                                    <th>Is new</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serverData.tableData.map( (dt, i) => (
                                    <tr key={i}>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.data_variable }} /> </td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.period_of_the_data }} /> </td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.frequency_of_data }} /> </td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.expt_name_model_used }} /> </td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.reference }} /> </td>
                                        <td> <div dangerouslySetInnerHTML={{ __html: dt.remarks }} /> </td>
                                        <td> {dt.is_new == 1?(
                                            <img src="https://www.pngmart.com/files/23/New-PNG-File.png" style={{width: '50px'}} alt="" />
                                        ):(
                                            <>
                                            </>
                                        )} </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                        
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