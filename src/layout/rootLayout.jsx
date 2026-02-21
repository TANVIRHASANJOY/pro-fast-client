import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Home/Shared/navBar/NavBar';
import Footer from '../pages/Home/Shared/Footer/Footer';

const rootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default rootLayout;