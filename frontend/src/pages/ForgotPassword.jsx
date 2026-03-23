import React, { useContext, useState } from 'react'
import axios from 'axios'
import {ShopContext} from '../context/ShopContext'
import {toast} from 'react-toastify'

const ForgotPassword = () => {

    const {backendUrl} = useContext(ShopContext);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const res = await axios.post( backendUrl + '/api/user/forgot-password', {email});
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

  return (
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col items-center justify-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4'>
        <h2 className='text-2xl font-bold'>Forgot password</h2>
        <input 
        type="email"
        placeholder='Enter your email'
        className='w-full px-3 py-2 border border-x-gray-800 outline-none focus:ring-2 focus:ring-indigo-400'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
         />
        <button className='bg-black text-white px-8 py-2 rounded-full'>
            Send reset link
        </button>
    </form>
  )
}

export default ForgotPassword