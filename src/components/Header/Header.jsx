import React from 'react';
import './Header.css';
import timg from '../../assets/timg.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
          <div className='w-10 h-10 flex gap-2 justify-center items-center'>
          <img  src={timg} alt="" />
          <p>MMM mart</p>
          </div>
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/registration">register</Link>
            </div>
        </nav>
    );
};

export default Header;