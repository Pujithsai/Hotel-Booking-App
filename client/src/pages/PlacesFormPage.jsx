import React, { useEffect, useState } from 'react';
import Perks from '../Perks';
import AccountNavigation from '../AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


const PlacesFormPage = () =>{
    
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [redirect,setRedirect] = useState(false)
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    useEffect(() =>{
        if (!id) {
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    },[id]);
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link: photoLink});
        setAddedPhotos(prev => {
            return [...prev,filename];
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev){
        const data = new FormData();
        const files = ev.target.files;
        console.log({files});
        for (let i = 0; i<files.length; i++){
            data.append('photos',files[i]);
        }
        
        axios.post('/upload', data, {
            headers: { 'Content-type': 'nultipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        });
        

    }

    async function savePlace(ev) {
        ev.preventDefault();
        if (id) {
            const placeData = { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price };
            const { data: responseData } = await axios.put(`/places/${id}`, placeData);
            setRedirect(true);
        } else {
            // Handle the case when there is no id (indicating a new place)
            const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price };
            const { data: responseData } = await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    function removePhoto(ev,filename){
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
    }   

    if (redirect){
        return <Navigate to={'/account/places'} />
    }

    function selectPhoto(ev, filename){
        ev.preventDefault();
        const wihoutmain = [...addedPhotos.filter(photo => photo !== filename)];
        const newaddedPhotos = [filename,...wihoutmain];
        setAddedPhotos(newaddedPhotos);
    }

    return(
        <div>
            <AccountNavigation/>
                    <form onSubmit={savePlace}>
                        <h2 className='text-2xl mt-4'>Title</h2>
                        <p className='text-grey-500 text-sm'>Title for your place should be short and catchy as in advertisment</p>
                        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)}placeholder='title, for eaxample my lovely place'/>
                        <h2 className='text-2xl mt-4'>Address</h2>
                        <p className='text-grey-500 text-sm'>Address to tis place</p>
                        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address'/>
                        <h2 className='text-2xl mt-4'>Photos</h2>
                        <p className='text-grey-500 text-sm'>More Photos better</p>
                        <div className='flex gap-2'>
                            <input type='text' value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='Add using a link .... jpg'/>
                            <button className='bg-grey-200 px-4 rounded-2xl' onClick={addPhotoByLink}>Add &nbsp;photo</button>
                        </div>
                        <input type='file' className='hidden'/>
                        <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className='h-32 flex relative' key = {link}>
                                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/" + link} alt="" />
                                    <button onClick={ev => removePhoto(ev,link)} className='absolute bottom-1 cursor-pointer right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                    <button onClick={ev => selectPhoto(ev,link)} className='absolute bottom-1 cursor-pointer left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                                        {link === addedPhotos[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                            </svg>
                                          
                                        )} 
                                        {link !== addedPhotos[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                        )}
                                        
                                    </button>
                                </div>
                            ))}
                            <label className='h-32 flex cursor-pointer items-center border bg-transparent rounded-2xl p-2 text-grey-500 flex justify-center gap-1 text-2xl'>
                                <input type='file' multiple className='hidden' onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        <h2 className='text-2xl mt-4'>Description</h2>
                        <p className='text-grey-500 text-sm'>Description of the place</p>
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} /> 
                        <h2 className='text-2xl mt-4'>Perks</h2>
                        <p className='text-grey-500 text-sm'>Select perks of your place</p>
                        
                        <Perks selected={perks} onChange={setPerks}/>
                        
                        <h2 className='text-2xl mt-4'>Extra Info</h2>
                        <p className='text-grey-500 text-sm'>House Rules </p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}   />
                        <h2 className='text-2xl mt-4'>Check In&Out times, max guests</h2>
                        <p className='text-grey-500 text-sm'>add check in and out times, remeber to have some time window to clean the room netween guests </p>
                        <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check In time</h3>
                                <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type='text' placeholder='14:00'/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check Out time</h3>
                                <input type='text' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='11:00'/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max guests</h3>
                                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type='number'/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Price Per Night</h3>
                                <input value={price} onChange={ev => setPrice(ev.target.value)} type='number'/>
                            </div>
                        </div>
                        <div>
                            <button className='primary mt-4'>Save</button>
                        </div>
                    </form>
                </div>
    );
}

export default PlacesFormPage;