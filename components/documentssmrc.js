import { useSession, signOut } from "next-auth/react"
import Documentscntsmrc from "./documentcntsmrc";
import Documents2smrc from "./documents2smrc";
import Documentfilessmrc from "./documentfilesmrc";

function Documentssmrc(meetingData){

    const session = useSession();
    
    return (
        <>

                {session.status == 'authenticated'?(
                    <>
                        <div className="accordion" id="accordionExample">                
                            <div className="d-flex justify-content-end mb-2">
                                <button className="btn btn-outline-success mx-2">{session?.data?.user?.name} </button>
                                <button onClick={signOut} className="btn btn-sm btn-danger">Logout</button>
                            </div> 
                            
                            {meetingData?(
                                <>
                                    {/* {console.log(meetingData)} */}
                                    {/* {console.log(meetingData.meetingData.meetingsData.map( (res)=> {return res} ))} */}
                                    {meetingData?.meetingData?.meetingsData?.map( (mData, i) =>(

                                            <div className="accordion-item" key={i}>
                                                <h2 className="accordion-header" id={'headingOne'+i} >
                                                <button className={i==0? "accordion-button ": "accordion-button collapsed" } type="button" data-bs-toggle="collapse" data-bs-target={'#collapseOne'+i} aria-expanded="true" aria-controls="collapseOne">
                                                    {mData.heading}
                                                </button>
                                                </h2>
                                                <div id={'collapseOne'+i} className={i==0? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        {/* Table, link, Text */}
                                                        {mData.contents?(
                                                            <>
                                                            <Documentscntsmrc contents={mData.contents} />  
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {/* Heading documents where null content */}
                                                        {mData.documents?(
                                                            <>
                                                                <Documentfilessmrc docs_data={mData.documents} />
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}

                                                        {/* Child headings */}
                                                        {mData.child?(
                                                            <>
                                                            <Documents2smrc childData={mData.child} /> 
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        //console.log(mData.id)
                                    ) )}
                                </>
                            ):(
                                <>
                                
                                </>
                            )}
                            
                        </div>
                    </>
                ):(
                    <>
                    
                    </>
                )}
            
        </>
    )
}

export default Documentssmrc;