import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../AddressLink';
import BookingDates from '../BookingDates';
import PlaceGallery from '../PlaceGallery';

const BookingPage = () =>{
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response =>{
               const foundBooking = response.data.find(({_id}) =>_id === id)
               if (foundBooking){
                setBooking(foundBooking);
               }
            });

        }
    },[id]);

    if(!booking){
        return "";
    }
    return (
        <div className='mt-8'>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <AddressLink >{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 mb-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className='text-xl mb-4'>Your Booking Information</h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className='text-white rounded-xl p-6 bg-primary'>
                    <div>Total Price</div>
                    <div className='text-2xl'>${booking.price}</div>
                </div>
                
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    );
}

export default BookingPage;