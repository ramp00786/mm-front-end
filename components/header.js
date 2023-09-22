import { useRouter } from "next/router";
import Link from "next/link";
import logo from "/img/mm-logo.png";
import Counter from "./counter";
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'

import GlobalConifg from '../pages/app.config';



function Header(ssData) {
    const router = useRouter();
    const API_URL_Local = GlobalConifg.API_URL_Local;

    const session = useSession();

    return (
        <>
           
            {/* Topbar Start */}
            <div className="container-fluid bg-secondary ps-5 pe-0 d-none d-lg-block">
                <div className="row gx-0">
                    <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center">
                            {/* <a className="text-body py-2 px-3 border-end" href=""><small>Support</small></a>
                            <a className="text-body py-2 px-3 border-end" href=""><small>Privacy</small></a>
                            <a className="text-body py-2 px-3 border-end" href=""><small>Policy</small></a>
                            <a className="text-body py-2 ps-3" href=""><small>Career</small></a> */}
                            <span className="text-body py-2 pe-3 border-end" >
                                <small>Upcoming <b>SMRC</b> and <b>SSC</b> Meeting </small>
                                {ssData.ssData.upcoming_date_time && ssData.ssData.upcoming_date_time!=''?(
                                    <Counter upcoming_date_time={ssData.ssData.upcoming_date_time} />
                                ):" soon"}
                                
                                </span>
                        </div>
                    </div>
                    <div className="col-md-6 text-center text-lg-end">
                        <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
                            <div className="me-3 pe-3 border-end py-2">
                                <p className="m-0"><i className="fa fa-envelope-open me-2"></i>{ssData.ssData.email} </p>
                            </div>
                            <div className="py-2">
                                <p className="m-0"><i className="fa fa-phone-alt me-2"></i>{ssData.ssData.contact_no}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}


            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
                <Link href="/" className="navbar-brand p-0">
                    <h1 className="m-0 text-uppercase text-primary pt-1" style={{fontSize: "20px"}}>
                        <img src={API_URL_Local+"/"+ssData.ssData.logo} alt="mm-logo" style={{height: "95px"}} />Monsoon Mission
                        {/* <i className="far fa-smile text-primary me-2"></i>consult */}
                    </h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 me-n3">
                        <Link href="/" className={router.pathname == "/" ? "nav-item nav-link active" : "nav-item nav-link"}>Home</Link>
                        <Link href="/about-us" className={router.pathname == "/about-us" ? "nav-item nav-link active" : "nav-item nav-link"}>About</Link>
                        <Link href="/meetings" className={router.pathname == "/meetings" ? "nav-item nav-link active" : "nav-item nav-link"}>Meetings</Link>
                        <Link href="/other-meetings" className={router.pathname == "/other-meetings" ? "nav-item nav-link active" : "nav-item nav-link"}>Other Meetings</Link>
                        <Link href="/services" className={router.pathname == "/services" ? "nav-item nav-link active" : "nav-item nav-link"}>Services</Link>
                        <div className="nav-item dropdown">
                            <Link href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Committees</Link>
                            <div className="dropdown-menu m-0">
                                <Link href="/Committees/SSC" className="dropdown-item">SSC</Link>
                                <Link href="/Committees/SMRC" className="dropdown-item">SMRC</Link>
                                <Link href="/Committees/Monsoon-Mission-Directorate" className="dropdown-item">Monsoon Mission Directorate</Link>
                            </div>
                        </div>
                        <Link href="/contact" className="nav-item nav-link">Contact</Link>
                        {session.status == 'authenticated'?(
                            <>
                                <Link href="#!" onClick={signOut} className="nav-item nav-link" > <span className="logout-btn">Logout</span>  </Link>
                            </>
                        ):(
                            <>
                                <Link href="/auth/signin" className="nav-item nav-link"><span className="login-btn">Login</span></Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
        </>
    )
       
} 
export default Header