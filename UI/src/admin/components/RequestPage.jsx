import React, { useEffect, useState } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/adminSlice'
import apiInstance from '../../utils/APIinstance'
import { Link, useNavigate } from 'react-router-dom'

const RequestPage = () => {
    const [requestList, setRequestList] = useState([])
    const [loading, setLoading] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector((store) => store.admin)
    const isLoggedIn = admin.success;


    const handleLogout = async () => {
        await apiInstance.post('/admin/logout')
        dispatch(logout())
    }

    const fetchRequestList = async () => {
        const response = await apiInstance.get('/admin/requests')
        if (response?.data) {
            const { success, requests, message } = response.data
            setRequestList(requests)
        }
    }
    const handleGnerateLink = async (reqId) => {
        try {
            setLoading((prevState) => ({
                ...prevState,
                [reqId]: true 
            }));
            await apiInstance.post(`/admin/requests/${reqId}`);
            fetchRequestList()
            setLoading((prevState) => ({
                ...prevState,
                [reqId]: false 
            }));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/admin')
        }
    }, [isLoggedIn])

    useEffect(() => {
        fetchRequestList()
    }, [])

    return (
        <div>
            <body className="antialiased font-sans">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div className='flex '>
                            <button onClick={handleLogout} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <span>Logout</span>
                            </button>
                            <button class="bg-slate-500 hover:bg-slate-800 text-white font-semibold py-2 px-4 mx-4 rounded-lg inline-flex items-center">
                                <Link to="/admin/dashboard">
                                    <span>View Users</span>
                                </Link>
                            </button>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Send Link
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {requestList.map((req) => (
                                            <tr key={req._id} >

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap"> {req.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {!loading[req._id]? (<div className="flex items-center  gap-4">
                                                        <svg onClick={() => handleGnerateLink(req._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer ease-in-out hover:text-blue-600 transform hover:scale-110 rounded transition-all duration-300">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                        </svg>
                                                    </div>) : (

                                                        <div role="status">
                                                            <svg aria-hidden="true" className="ml-3 w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                            <span class="sr-only">Loading...</span>
                                                        </div>

                                                    )}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default RequestPage