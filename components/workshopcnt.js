export default function Workshopcnt({dd}){
    
    return (
        <>
            <div className="accordion workshop" id={'workshopAccording'+dd[0].id}>
                {dd?.map( (ws, i)=>(
                    <div className="accordion-item" key={i}>
                        <h2 className="accordion-header" id={'headin_'+i+dd[0].id}>
                        <button className={i==0?"accordion-button":"accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={'#collapse_'+i+dd[0].id} aria-expanded={i==0?"true":"false"} aria-controls={'collapse_'+i+dd[0].id}>
                            {ws.heading}
                        </button>
                        </h2>
                        <div id={'collapse_'+i+dd[0].id} className={i==0?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby={'heading_'+i+dd[0].id} data-bs-parent={'#workshopAccording'+dd[0].id}>
                        <div className="accordion-body">
                            
                            {ws.contents?.map( (cnt, j)=>(
                                <div key={j} dangerouslySetInnerHTML={{__html: cnt.workshop_content}}></div>
                            ) )}
                            {ws?.child?(
                                <>
                                    <Workshopcnt dd={ws.child} />
                                </>
                            ):(
                                <>
                                </>
                            )}
                        </div>
                        </div>
                    </div>
                ) ) }
                
            </div>
        </>
    )
}