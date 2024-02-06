import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function RegisterUser(ev) {
        ev.preventDefault();
        try{
            await axios.post('/register',{name,email,password});
            alert('Registration is Successful')
        }catch (e){
            alert('Registration Failed Try again');
        }
        
    }

    return(
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={RegisterUser} id="form1">
                    <input type='text' 
                    placeholder='John' 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}/>
                    <input type='email' 
                    placeholder='youremail.com' 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}/>
                    <input type='password' 
                    placeholder='password' 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className='primary'>
                        Register
                    </button>
                    <div>
                        <div className='text-center py-2 text-gray-500'>
                            Already a member?
                            <Link className="underline text-black" to={'/login'}>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;