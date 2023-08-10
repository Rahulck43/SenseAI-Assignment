import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/adminSlice'
import apiInstance from '../../utils/APIinstance'
import { Link, useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector((store) => store.admin)
    const isLoggedIn = admin.success;


    const handleLogout = async () => {
        await apiInstance.post('/admin/logout')
        dispatch(logout())
    }

    const fetchUsersList = async () => {
        const response = await apiInstance.get('/admin/users')
        if (response?.data) {
            const { success, users, message } = response.data
            setUsersList(users)
        }
    }
    const handleDelete = async (userId) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            setLoading((prevState) => ({
                                ...prevState,
                                [userId]: true
                            }))
                            await apiInstance.delete(`/admin/users/${userId}`);
                            fetchUsersList()
                            setLoading((prevState) => ({
                                ...prevState,
                                [userId]: true
                            }))
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/admin')
        }
    }, [isLoggedIn])

    useEffect(() => {
        fetchUsersList()
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
                                <Link to="/admin/requests">
                                    <span>View Requests</span>
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
                                                Name
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {usersList.map((user) => (
                                            <tr key={user._id}  >
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap"> {user.name}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap"> {user.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {!loading[user._id] ? (<div className="flex items-center gap-4">
                                                        <svg onClick={() => handleDelete(user._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer ease-in-out hover:text-red-600 transform hover:scale-110 rounded transition-all duration-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

export default DashBoard