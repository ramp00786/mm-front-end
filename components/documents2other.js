import { useSession, signOut } from "next-auth/react"


import Documentscntother from "./documentcntother";
import Documentfilesother from "./documentfileother";



function Documents2other(childData){

    const session = useSession();
    
    return (
        <>

                {session.status == 'authenticated'?(
                    <>
                        <div className="accordion mt-2" id={'accordionExample'+childData.childData[0].id}>  
                            {childData?(
                                <>
                                    
                                    {/* {console.log(meetingData.meetingData.meetingsData.map( (res)=> {return res} ))} */}
                                    {childData?.childData?.map( (mData, i) =>(
                                            <div className="accordion-item" key={i}>
                                                <h2 className="accordion-header" id={'headingOne'+mData.id} >
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapseOne'+mData.id} aria-expanded="true" aria-controls="collapseOne">
                                                    {mData.heading}
                                                </button>
                                                </h2>
                                                <div id={'collapseOne'+mData.id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent={'#accordionExample'+childData.childData[0].id}>
                                                    <div className="accordion-body">
                                                        {/* Table, link, Text */}
                                                        {mData.contents?(
                                                            <>
                                                            <Documentscntother contents={mData.contents} />  
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {/* Heading documents where null content */}
                                                        {mData.documents?(
                                                            <>
                                                                <Documentfilesother docs_data={mData.documents} />
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}

                                                        {/* Child headings */}
                                                        {mData.child?(
                                                            <>
                                                            <Documents2other childData={mData.child} /> 
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

export default Documents2other;