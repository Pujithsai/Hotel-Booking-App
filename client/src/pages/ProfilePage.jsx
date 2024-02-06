import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from '../AccountNavigation';

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser} = useContext(UserContext);
    let { subpage } = useParams();

    // Set default subpage to 'profile' if it's undefined
    if (!subpage) {
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('logout');
        setRedirect('/');
        setUser(null);
        

    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    console.log(subpage);

    
    if (redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNavigation/>
            {subpage === "profile" && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email})
                    <button onClick = {logout} className='primary max-w-md mt-2' >Logout</button>
                </div>
            )}
            {subpage === "places" && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
