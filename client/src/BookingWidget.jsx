import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {UserContext} from './UserContext';

const BookingWidget = ({place}) => {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name);
        }
    },[user])
    let id = place._id;
    let numberOfDays = 0;

    if (checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }

    async function bookThisPlace(){
        
        const response = await axios.post('/bookings', {
            place: place._id, // Change 'id' to '_id'
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price: numberOfDays*place.price,
            
            });
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        
        <div className='bg-white shadow p-4 rounded-xl '>
                        <div className='text-2xl text-center'> Price:${place.price} / per Night</div>
                        <div className='border rounded-2xl mt-4'>
                            <div className="flex">
                                <div className='px-4 py-3 border-r'>
                                    <label>Check In:</label>
                                    <input type='date' value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                                </div>
                                <div className='py-3 px-4 border-t'>
                                    <label>Check Out:</label>
                                    <input type='date' value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                                </div>
                            </div>
                        <div>
                            <div className='py-3 px-4 border-t'>
                                        <label>Number Of Guests:</label>
                                        <input type='number' value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                                    </div>
                        </div>
                            {numberOfDays > 0 && (
                                <div className='py-3 px-4 border-t'>
                                    <label>Full Name:</label>
                                    <input type='text' value={name} onChange={ev => setName(ev.target.value)} />
                                    <label>Phone Number:</label>
                                    <input type='tel' value={phone} onChange={ev => setPhone(ev.target.value)} />
                                </div>
                            )}
                        </div>
                        
                        <button onClick ={bookThisPlace} className='mt-4 primary'>
                            Book This Place
                            {numberOfDays > 0 &&(
                                <span> For {numberOfDays} Days</span>
                            )}
                            
                        </button>
                </div>
    );
}

export default BookingWidget;