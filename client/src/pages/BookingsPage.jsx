import React, { useEffect, useState } from 'react';
import AccountNavigation from '../AccountNavigation';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import PlaceImg from '../PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNavigation />
            <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden text-center py-4 mt-4 mb-4'>
                    <div className='w-48'>
                        <PlaceImg place={booking.place} />
                    </div>
                    <div className='py-3 grow pr-3'>
                        <h2 className='text-xl'>{booking.place.title}</h2>
                        <BookingDates booking={booking}/>
                        <div className='text-xl'>
                            <div className='flex gap-1 mb-2 mt-2 text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>

                            Number of Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} 
                            </div>
                            <div className='flex gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                                Total Price: ${booking.price}
                            </div>
                            
                        </div>
                        
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
}

export default BookingsPage;
