import React, { useContext, useState } from 'react';
import timg from '../../assets/timg.png'
import { Authcontext } from '../../Provider/Authprovider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase.config';


const Login = () => {

    const location=useLocation();
    const navigate=useNavigate()
    const [errormess,setErrormess]=useState('')

    const navigateTo =location?.state?.pathname || '/'
    
    const {signin,setUser}=useContext(Authcontext)
    const auth = getAuth(app);
    const provider= new GoogleAuthProvider()

    
    console.log(location)

    const handleLogin=(event)=>
    {
        event.preventDefault()
        const email=event.target.email.value;
        const pass=event.target.password.value;
        console.log(email,pass)
        signin(email,pass)
        .then((result) => {
            // Signed up 
            const user = result.user;
            console.log(user)
            setErrormess('')
            navigate(navigateTo)
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            setErrormess(errorMessage)
            // ..
          });
    }

    const googleSignin=()=>
    {

   signInWithPopup(auth, provider)

  .then((result) => {
    const user = result.user;
    setUser(user)
    navigate(navigateTo)
  })

  .catch((error) => {
    const errorMessage = error.message;
    setErrormess(errorMessage)
  });    
}

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 fl">
                <div className="hero-content flex-col lg:flex-row ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-3 ">Login now!</h1>
                        <img src={timg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p className='my-3'>if you haven't account please <span className='text-blue-500'><Link to='/registration'>register</Link></span></p>
                        </form>
                        <p className='text-red-500'>{errormess}</p>
                        <button className="btn btn-outline btn-info" onClick={googleSignin}>google Signin</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;