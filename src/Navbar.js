import React, { useState } from 'react';
import { BsHouse } from 'react-icons/bs';
import { CgUserList } from 'react-icons/cg';
import { BsList } from "react-icons/bs";
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
import './App.css';

function Navbar({ user, handleLogout }) {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light" className="navbar">
      <MDBContainer fluid>
        <div className="logo">
            <MDBNavbarBrand href="/">Foodie</MDBNavbarBrand>
        </div>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={openBasic ? 'true' : undefined}>
          <MDBNavbarNav className="d-flex align-items-center w-100">
            <div className="ms-auto d-flex align-items-center">
              {user ? (
                <div className="authorized">
				  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/home">
                        <BsHouse className="home-icon" />
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem className="nav-item user-info">
                    <span>Logged in as <span className="name">{user.displayName}</span></span>
                  </MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag="a" style={{ fontSize: '19px' }} className="nav-link toggle custom-dropdown-toggle" role="button">
                        <BsList />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu style={{ fontSize: '10px' }}>
                      <MDBDropdownItem link>
                        <MDBIcon icon="cog" fas /> View Profile
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                        <MDBIcon icon="cogs" fas /> Settings
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={handleLogout}>
                        <MDBIcon icon="sign-out-alt" fas /> Log out
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
              ) : (
                <div className="unauthorized">
                  <MDBNavbarItem>
                    <MDBNavbarLink active aria-current="page" href="/home">
                       <BsHouse className="home-icon" />
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag="a" className="nav-link custom-dropdown-toggle" role="button">
                      <CgUserList style={{ fontSize: '20px' }} />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu style={{ fontSize: '10px' }}>
                      <MDBDropdownItem link href="login">
                        <MDBIcon icon="sign-in-alt" fas /> Login
                      </MDBDropdownItem>
                      <MDBDropdownItem link href="signup">
                        <MDBIcon icon="user-plus" fas /> Sign up
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
              )}
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;