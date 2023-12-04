import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const navItemStyle = {
    color: 'white', // Set text color to white
};
const navBrandStyle = {
    color: 'white',
    fontSize: '46px'  
};

const NavBar = () => {
    return (
        <Navbar color="dark" light expand="md" style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1020 }} className='p-4'>
            <NavbarBrand href="/" style={navBrandStyle} >Apollo Shop</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/" style={navItemStyle}>Coffees</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/cart" style={navItemStyle}>Cart</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/orders" style={navItemStyle}>Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/addcoffee" style={navItemStyle}>Add Coffee</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavBar;
