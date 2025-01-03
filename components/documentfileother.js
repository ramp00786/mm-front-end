import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
import { useState, useEffect } from "react"
import axios from 'axios';

import GlobalConifg from '../app.config'


const API_URL_Local = GlobalConifg.API_URL_Local;

function slipString(string, from, to){
    return string;
    // if(string.length>to){
    //     return string.substring(from,to)+'...';
    // }
    // else{
    //     return string.substring(from,to);
    // }
}


function fileExtension(docsInfo){
    let parts = docsInfo.split(".");
    return parts[1];
}

function Documentfilesother(docs_data){

    const session = useSession();

    const token_id = session?.data?.user?.email;
    sessionStorage.setItem("session_id", token_id);

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    
   

    const downloadFile = (event) =>{
        if(session.status == 'authenticated'){
            setLoader(true);
            setError('');
            const token = session?.data?.user?.email;
            
            const axiosConfig = {
                responseType: 'arraybuffer',
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get(API_URL_Local+'/api/other-file-download?id='+event.target.id, axiosConfig)
            .then((response)=>{
                setLoader(false);
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', event.target.title);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error)=>{
                setLoader(false)
                setError(error.message)
            })
        }
        else{
            setLoader(false);
            setError('Please login first')
        }
    }
    
    return (
        <>
            {session.status == 'authenticated'?(
                <>  
                    {docs_data.docs_data?(
                        <>  
                            <ul>
                                {docs_data?.docs_data?.map( (docsInfo, i) =>(
                                    <li key={i}>
                                        <Link href="#!" title={docsInfo.document_title+'.'+fileExtension(docsInfo.document_file)}  id={docsInfo.id} onClick={downloadFile} >{slipString(docsInfo.document_title, 0,32)}</Link>
                                    </li>
                                ) )}
                            </ul>
                        </>
                    ):(
                        <>
                        </>
                    )}
                </>
            ):(
                <>
                </>
            )}
        </>
    )
}

export default Documentfilesother;