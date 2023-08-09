import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../utils/userSlice'
import apiInstance from '../../utils/APIinstance'
import { useLocation, Link } from 'react-router-dom'

const NavBar = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const handleLogout = async () => {
         await apiInstance.post('/logout')
        dispatch(logout())
    }
    const isEditProfilePage = location.pathname === '/edit-profile'

    return (
        <nav className="bg-gray-200 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className=" font-bold text-xl"></div>
                <div>
                    {isEditProfilePage ? (
                        <Link
                            to="/profile"
                            className="bg-slate-500 hover:bg-slate-800 text-white font-semibold py-2 px-4 mx-4 rounded"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                        to="/edit-profile"
                        className="bg-slate-500 hover:bg-slate-800 text-white font-semibold py-2 px-4 mx-4 rounded"
                    >
                        Edit Profile
                    </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar