import { useSession, signOut } from "next-auth/react"
import Documentfiles from "./documentfiles";

function displayHtml(htmlString) {
    return {__html: htmlString};
}


function Documentscnt(contents){

    const session = useSession();

    const token_id = session?.data?.user?.email;
    sessionStorage.setItem("session_id", token_id);
    
    return (
        <>

                {session.status == 'authenticated'?(
                    <>
                        {/* {console.log(contents.contents.map( (res)=>( res) ))} */}
                        {contents.contents?(
                            <>  
                                {contents?.contents?.map( (cnt, i) =>(

                                    <div key={i}>
                                        {cnt.content_type == 2?(
                                            <>
                                                <a target="_blank" href={cnt.link}>{cnt.link_text?cnt.link_text:cnt.link}</a>
                                            </>
                                        ):(
                                            <>
                                            </>
                                        )}

                                        {cnt.content_type == 3?(
                                            <>
                                                <div dangerouslySetInnerHTML={{ __html: cnt.ssc_content }}></div>
                                                
                                            </>
                                        ):(
                                            <>
                                            </>
                                        )}

                                        {cnt.content_type == 1?(
                                            <>
                                                <table className="cnt-table my-4">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No.</th>
                                                            <th>Name of the PI</th>
                                                            <th>Name of the Organization/Institute</th>
                                                            <th>Title of the Project</th>
                                                            <th>#.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{i+1}</td>
                                                            <td>{cnt.name_of_the_pi}</td>
                                                            <td>{cnt.name_of_the_organization}</td>
                                                            <td>{cnt.title_of_the_proposal}</td>
                                                            <td> 
                                                                {cnt.docs_data?(
                                                                    <>
                                                                        
                                                                        <Documentfiles docs_data={cnt.docs_data} />
                                                                    </>
                                                                ):(
                                                                    <>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </>
                                        ):(
                                            <>
                                            </>
                                        )}
                                    </div>

                                ) )}
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

export default Documentscnt;