import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import EditProfile from '../components/EditProfile'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {
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
        <div className='flex  justify-center flex-grow mt-20'>
          <EditProfile />
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage