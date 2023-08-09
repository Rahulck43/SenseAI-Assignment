import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/userSlice'
import apiInstance from '../../utils/APIinstance'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const handleLogout = async () => {
        const response = await apiInstance.post('/logout')
        dispatch(logout())
    }

    return (
        <nav className="bg-gray-200 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">My App</div>
                <div>
                    <button onClick={()=>navigate('/edit-profile')}
                        className=" bg-slate-500 hover:bg-slate-800 text-white font-semibold py-2 px-4 mx-4 rounded">
                        Edit Profile
                    </button>
                    <button onClick={handleLogout}
                        className="b bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar