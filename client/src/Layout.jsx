import React from 'react';
import Header from './Header';
import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return(
        <div className='py-8 px-8 flex flex-col min-h-screen'>
            <Header />
            <Outlet />
        </div>
    );
}

export default Layout;