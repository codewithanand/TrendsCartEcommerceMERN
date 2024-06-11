import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import './navbar.scss'
import { AuthContext } from '../../contexts/AuthenticationContext.jsx'
import { DarkModeContext } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { darkMode, toggle } = useContext(DarkModeContext)
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='navbar'>
      <div className='nav-items'>
        <Link className='brand' to="/">
          <img className='brand-img' src="" alt="" />
          <h1 className='brand-text'>TrendsCart</h1>
        </Link>
        {darkMode ? <LightModeOutlinedIcon className='theme-btn' onClick={toggle} /> : <DarkModeOutlinedIcon className='theme-btn' onClick={toggle} />}
      </div>
      <div className='nav-items links'>
        <Link className='nav-links' to="/">Home</Link>
        <Link className='nav-links' to="/">About</Link>
        <Link className='nav-links' to="/">Contact</Link>
      </div>
      {
        currentUser
          ? (<div className='nav-items user' onClick={() => setOpenMenu(!openMenu)}>
            <img className='profile-picture' src="" alt="" />
            <span className='user-name'>{currentUser.name}</span>
          </div>)
          : (<div className='nav-items user'>
            <Link className='nav-btns' to="/login">Login</Link>
            <Link className='nav-btns' to="/register">Register</Link>
          </div>)
      }

      <div className='user-menu' style={{ display: openMenu ? "flex" : "none", }}>
        <Link className='user-menu-item' to="/account">Account</Link>
        <span className='user-menu-item' onClick={() => logout()}>Logout</span>
      </div>
    </div>
  )
}

export default Navbar