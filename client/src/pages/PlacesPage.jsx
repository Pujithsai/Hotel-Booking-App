import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNavigation from '../AccountNavigation';
import PlaceImg from '../PlaceImg';

const PlacesPage = () =>{

    const {action} = useParams();

    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    },[]);

    return(
        <div>
            <AccountNavigation/>
            
                <div className='text-center '>
                    
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                    Add new Place
                </Link>
                <div className='mt-4 mb-4'>
                    {places.length > 0 && places.map(place =>(
                        <div className='p-4'>
                            <Link to = {'/account/places/'+place._id} className='flex cursor-pointer bg-gray-200 gap-4 p-4 rounded-2xl'>
                            <div className='flex bg-gray-300 h-32 grow shrink-0 rounded-2xl' >
                                <PlaceImg place={place}/>
                            </div>
                            <div className='shrink grow-0'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
 
            
        </div>
    );
}

export default PlacesPage;