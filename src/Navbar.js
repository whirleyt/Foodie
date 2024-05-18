import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { BsHouse } from 'react-icons/bs';
import { CgUserList } from "react-icons/cg";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { auth } from './firebase';
import './App.css';

function Navbar({ user, handleLogout }) {
  const [openBasic, setOpenBasic] = useState(false);
  const navigate = useNavigate();

  return (
    <MDBNavbar expand='lg' light bgColor='light' className='navbar'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          Foodie
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 navbar-nav'>
            <MDBNavbarItem className='nav-item'>
              <MDBNavbarLink active aria-current='page' href='/home' role="button">
                <BsHouse style={{ fontSize: '20px' }}/>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='nav-item'>
              <MDBNavbarLink href='#'>
                <MDBIcon icon='link' fas />
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user && (
              <MDBNavbarItem className='nav-item user-info'>
                <span>Logged in as {user.displayName}</span>
              </MDBNavbarItem>
            )}
            {user && (
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>
                    <MDBIcon icon='cog' fas /> View Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBIcon icon='cogs' fas /> Settings
                  </MDBDropdownItem>
                  <MDBDropdownItem link onClick={handleLogout}>
                     <MDBIcon icon='ellipsis-h' fas /> Log out
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            )}
            {!user && (
            <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link custom-dropdown-toggle" role="button">
                          <CgUserList style={{ fontSize: '22px' }}/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href='login'>
                    <MDBIcon icon='cog' fas /> Login
                  </MDBDropdownItem>
                  <MDBDropdownItem link href='signup'>
                    <MDBIcon icon='cogs' fas /> Sign up
                  </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
			)}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;