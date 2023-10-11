import React, { useContext } from 'react';
import register from '../../assets/register.jpg'
import { Authcontext } from '../../Provider/Authprovider';

const Registration = () => {
    
    const {createUser}=useContext(Authcontext)

    const handleregistration=(event)=>
    {
        event.preventDefault()
        const email=event.target.email.value;
        const pass=event.target.password.value;
        console.log(email,pass)
        createUser(email,pass)
        .then((result) => {
            // Signed up 
            const user = result.user;
            console.log(user)
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
          });

    }

    return (
       
        <div>
        <div className="hero min-h-screen bg-base-200 fl">
            <div className="hero-content flex-col lg:flex-row ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold my-3 w-50 h-50  ">Register Please!</h1>
                    <div >
                    <img  src={register} alt="" />
                    </div>
                </div>
                
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleregistration} className="card-body">
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
                            <input className='btn btn-primary' value='SignUP' type="submit" />
                            {/* <button className=""></button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
    );
};

export default Registration;