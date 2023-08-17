

export default function LoginWindow({handleSubmit, userEmail, userPassword, handleChangeEmail, handleChangePassword}){
    function updateEmail(event){
        handleChangeEmail(event.target.value)
    }
    function updatePassword(event){
        handleChangePassword(event.target.value)
    }
    return (
        <>      
            <div className="col-12 border p-4">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userEmail} onChange={updateEmail} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={userPassword} onChange={updatePassword} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

