import React, { useContext } from 'react';
import './Header.css';
import timg from '../../assets/timg.png';
import { Link } from 'react-router-dom';
import { Authcontext } from '../../Provider/Authprovider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase/firebase.config';

const Header = () => {
    const { user,logout } = useContext(Authcontext);

    const handleSignOut = () => {   
        logout()
        .then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });}

    return (
        <nav className='header'>
            <div className='w-10 h-10 flex gap-2 justify-center items-center'>
                <img src={timg} alt="" />
                <p>MMM mart</p>
            </div>
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <>
                    {
                        user?.email ? <button onClick={handleSignOut} className='btn btn-outline btn-error mx-5'>LogOut</button> : <Link to='login'>Login</Link>
                    }
                </>
                <Link to="/registration">register</Link>
            </div>
        </nav>
    );
};

export default Header;