import React, { useContext, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {ShopContext} from '../context/ShopContext'
import { toast } from 'react-toastify'


const ResetPassword = () => {

    const {token} = useParams();
    const {backendUrl} = useContext(ShopContext);

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post( backendUrl + `/api/user/reset-password/${token}`, {password});
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

  return (
    <form 
    onSubmit={handleSubmit}
    className='flex flex-col items-center justify-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4'>
        <input 
        type="password"
        placeholder='Enter new password'
        className='w-full px-3 py-2 border border-x-gray-800 outline-none focus:ring-2 focus:ring-indigo-400'
        onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-black text-white px-8 py-2 rounded-full'>Reset Password</button>
    </form>
  )
}

export default ResetPassword