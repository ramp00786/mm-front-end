function Footer(ssData){
    return (
        <>
            <div className="container-fluid bg-primary text-secondary p-5">
                <div className="row g-5">
                    <div className="col-12 text-center">
                        <h1 className="display-5 mb-4">Stay Update!!!</h1>
                        <form className="mx-auto" style={{maxWidth: "600px"}}>
                            <div className="input-group">
                                <input type="text" className="form-control border-white p-3" placeholder="Your Email" />
                                <button className="btn btn-dark px-4">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-secondary p-5">
                <div className="row g-5">

                    <div className="col-lg-4 col-md-6">
                        <h3 className="text-white mb-4">Address</h3>
                        <p className="mb-2">

                            <i className="bi bi-geo-alt text-primary me-2"></i>
                        
                        <span style={{fontSize: "14px", color: "orange"}}>Indian Institute of Tropical Meteorology, </span> <br />
                        <span style={{fontSize: "14px", marginLeft: "24px"}}>Dr. Homi Bhabha Road, Pashan, </span><br /> 
                        <span style={{fontSize: "14px", marginLeft: "24px"}}>Pune - 411 008, Maharashtra, India</span>
                        
                        </p>
                        
                    </div>


                    <div className="col-lg-4 col-md-6">
                        <h3 className="text-white mb-4">Contact</h3>
                        <div className="d-flex flex-column justify-content-start">
                            <p className="mb-2"><i className="bi bi-envelope-open text-primary me-2"></i>monsoon_mission@tropmet.res.in</p>
                            <p className="mb-0"><i className="bi bi-telephone text-primary me-2"></i>+91-20-2590-4424</p>
                            <p className="mb-0"><i className="bi bi-telephone text-primary me-2"></i>+91-20-2586-5142</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h3 className="text-white mb-4">Links</h3>
                        <div className="d-flex flex-column justify-content-start" style={{fontSize: "14px"}}>
                            <a className="text-secondary mb-2" href="https://www.tropmet.res.in"><i className="bi bi-arrow-right text-primary me-2"></i>https://www.tropmet.res.in</a>
                            <a className="text-secondary mb-2" href="http://mol.tropmet.res.in"><i className="bi bi-arrow-right text-primary me-2"></i>http://mol.tropmet.res.in</a>
                            <a className="text-secondary mb-2" href="http://www.tropmet.res.in/erpas/"><i className="bi bi-arrow-right text-primary me-2"></i>http://www.tropmet.res.in/erpas/</a>
                            <a className="text-secondary mb-2" href="http://srf.tropmet.res.in/srf/hires_gefs/index.php"><i className="bi bi-arrow-right text-primary me-2"></i>http://srf.tropmet.res.in/srf/hires_gefs/index.php</a>
                            <a className="text-secondary" href="http://imdpune.gov.in/Clim_Pred_LRF_New/Models.html"><i className="bi bi-arrow-right text-primary me-2"></i>http://imdpune.gov.in/Clim_Pred_LRF_New/Models.html</a>
                        </div>
                    </div>

                    

                    
                </div>
            </div>
            <div className="container-fluid bg-dark text-secondary text-center border-top py-4 px-5" style={{borderColor: "rgba(256, 256, 256, .1) !important"}} >
                <p className="m-0">
                    
                    &copy; <a className="text-secondary border-bottom" href="#.">{ssData.ssData.copyright}</a>. All Rights Reserved. 
                    
                    <br/>
                    
                    <small style={{fontSize: "12px"}}> Developed by <a target="_blank" className="text-secondary border-bottom" href="https://www.linkedin.com/in/tulsiram-kushwah-software-engineer/">Tulsiram Kushwah (Project Scientist II ), Monsoon Mission</a> </small>
                
                    <br/>

                    <small style={{fontSize: "11px", color: "#445983"}}> Designed by <a target="_blank" className="text-secondary blur-text" href="https://htmlcodex.com" style={{color: "#445983"}}>HTML Codex</a> </small>

                </p>
            </div>
        </>
    )
}

export default Footer;