import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ProfilePage = () => {
    const isLoggedIn=useSelector((store)=>store.user.success)
    const navigate=useNavigate()

    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/')
        }
    },[isLoggedIn])

    return (
        <div className='bg-blue-50 min-h-screen' >
            <div>
                <NavBar />
                <div className='flex  justify-center mt-20'>
                    <Profile  />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage