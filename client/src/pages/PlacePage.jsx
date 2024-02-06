// PlacePage component
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data); // Assuming response.data contains the place details
    });
  }, [id]);

  if (!place) {
    return null; // Return null instead of an empty string
  }

  

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <div className='relative'>
          <PlaceGallery place={place}/>
        
        <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
            <div>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>
                        Description
                        </h2>
                    {place.description}
                </div>
                Check-in: {place.checkIn} <br/>
                Check-out:{place.checkOut}<br/>
                Max Number of Guest: {place.maxGuests}<br/>
                
            </div>
            <div>
                <BookingWidget place={place}/>
            </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div className='mt-2'>
                <h2 className='font-semibold text-2xl'>Extra Info</h2>
            </div>
            <div className='text-sm text-gray-700 leading-5 mt-1 mb-4'>
                        {place.extraInfo}
                    </div>
        </div>
        
      </div>
    </div>

  );
}

export default PlacePage;
