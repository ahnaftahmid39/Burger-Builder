import React from 'react';
import { NavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import './Header.css'
import Logo from '../../assets/logo.png'
import { connect } from 'react-redux';
import { Flex, HStack, Image, Link } from '@chakra-ui/react';

const matStateToProps = state => ({
    token: state.token
})

function Header(props) {
    let links = (
        <Nav className='mr-md-5'>
            <NavItem>
                <NavLink exact='true' to='/login' className='NavLink'>
                    Login
                </NavLink>
            </NavItem>
        </Nav>
    )

    let link = (
        <>
            <Link href='/login'>
                Login
            </Link>
        </>
    )
    if (props.token) {
        links = (
            <Nav className='mr-md-5'>
                <NavItem>
                    <NavLink exact='true' to='/' className='NavLink'>
                        Burger Builder
                    </NavLink>
                    <NavLink exact='true' to='/orders' className='NavLink'>
                        Orders
                    </NavLink>
                    <NavLink exact='true' to='/logout' className='NavLink'>
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        )

        link = (
            <>
                <Link href='/'>
                    Burger Builder
                </Link>
                <Link href='/orders'>
                    Orders
                </Link>
                <Link href='/logout'>
                    Logout
                </Link>
            </>
        )
    }
    return (
        <div className='Navigation'>
            <Navbar style={{
                backgroundColor: '#d70f64',
                height: '70px'
            }}>
                <NavbarBrand
                    to='/'
                    className='mr-auto ml-md-5 Brand'
                >
                    <img src={Logo} alt="logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
            {/* <Flex as={'nav'} bgColor={'#d70f64'} height={'70px'} >
                <Image ml={'3'}src={Logo} alt="logo" w={'80px'}></Image>
                <HStack ml={'auto'}>
                    {link}
                </HStack>
            </Flex> */}

        </div>
    )
}

export default connect(matStateToProps)(Header)