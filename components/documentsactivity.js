import LoginWindow from '@/components/loginWindow'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Documentsactivity({docs, handleSubmit, userEmail, userPassword, handleChangeEmail, handleChangePassword}){
    console.log(docs)
    const session = useSession();
    console.log(session);
    return (
        <>
            {docs?.restricted==1?(
                <>
                    {session.status=='authenticated'?(
                        <>
                            <div className="d-flex justify-content-end mb-2">
                                <button className="btn btn-outline-success mx-2">{session?.data?.user?.name} </button>
                                <button className="btn btn-sm btn-danger" onClick={signOut}>Logout</button>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: docs.content }}></div>
                        </>
                    ):(
                        <div className="row justify-content-md-center">
                            <div className='col-lg-4'></div>
                            <div className='col-lg-4'>
                                <LoginWindow handleSubmit={handleSubmit} userEmail={userEmail} userPassword={userPassword} handleChangeEmail={handleChangeEmail} handleChangePassword={handleChangePassword} loginstatus={loginstatus} />
                            </div>
                            <div className='col-lg-4'></div>
                        </div>
                    )}
                    
                </>
            ):(
                <>
                    <div dangerouslySetInnerHTML={{ __html: docs.content }}></div>
                </>
            )}
        </>
    )
}