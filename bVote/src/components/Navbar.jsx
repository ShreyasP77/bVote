import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { VscClose, VscMenu } from "react-icons/vsc";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const Nav = styled.nav`
// position:fixed;
z-index:9999;
  .navbar-list{
    display:flex;
    gap:4.8rem;
    padding: 0 4.8rem; 

  
    z-index:999;


   li{
    list-style:none;
    .navbar-link{
      text-decoration:none;
      &:link,
      &:visited{
        display:inline-block;
        text-decoration:dashed;
        font-size:1.45rem;
        font-weight:500;
        text-transform:uppercase;
        color:${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;
      }

      &:hover,
      &active{
        color:${({ theme }) => theme.colors.helper};
      }
    }
    div{
      width:5px;
      height: 5px;
      background: transparent;
      border-radius: 50%;
      margin:auto;
      margin-bottom: 5px;
      
    }
    &:hover{
      div{
      background-color:${({ theme }) => theme.colors.helper};}
    }

  }
  }

  .mobile-navbar-btn {
    display: none;
    .close-outline {
      display: none;
    }
  }

  .mobile-navbar-btn[name="close-outline"] {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 999;
      border: ${({ theme }) => theme.colors.black};
      .mobile-nav-icon {
        padding-right:2.5rem;
        font-size: 5.8rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }
    /* hide the original nav menu  */
    .navbar-list {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${({ theme }) => theme.colors.bg};
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      text-align: center;
      transform: translateX(100%);
      visibility: hidden;
      opacity: 0;


      z-index:999;

      
      li {
        .navbar-link {
          &:link,
          &:visited {
            font-size: 4.2rem;
          }
          &:hover,
          &:active {
            color: ${({ theme }) => theme.colors.helper};
          }
        }
      }
    }
    .active .mobile-nav-icon {
      display: none;
      font-size: 6.1rem;
      position: absolute;
      top: 22%;
      right: 1%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 999999;
    }
    .active .close-outline {
      display: inline-block;
    }
    .active .navbar-list {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 99999;
    }
  }

  `;

  return (
    // <div>
    <Nav><div className={openMenu ? "menuIcon active" : "menuIcon"}>
      <ul className="navbar-list">

        <li>
          <div></div>
          <NavLink className='navbar-link'
            onClick={() => setOpenMenu(false)}
            to="/">Home</NavLink>
        </li>
        <li>
          <div></div>
          <NavLink className='navbar-link'
            onClick={() => setOpenMenu(false)}
            to="/about">About</NavLink>
        </li>
        <li>
          <div></div>
          <NavLink className='navbar-link'
            onClick={() => setOpenMenu(false)}
            to="/admin">Admin</NavLink>
        </li>

      </ul>

      <div className="mobile-navbar-btn">
        <VscMenu
          name="menu-outline"
          className="mobile-nav-icon"
          onClick={() => setOpenMenu(true)} />

        <VscClose
          name="close-outline"
          className="close-outline mobile-nav-icon"
          onClick={() => setOpenMenu(false)} />
      </div>
    </div>

    </Nav>
    // {/* <div>ssk</div> */}
    // </div>

  )
}

export default Navbar