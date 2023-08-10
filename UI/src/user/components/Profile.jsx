import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/APIinstance'
import { useSelector } from 'react-redux'

const Profile = () => {

  const [userData, setUserData] = useState({})
  const email = useSelector((store) => store.user.email)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiInstance.get(`/users/${email}`)
        if (response?.data?.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className="max-w-md p-8 rounded-xl shadow-lg sm:flex sm:space-x-6 dantialiased bg-gradient-to-br from-green-100 to-white flex flex-wrap">
      <div className='flex items-center'>
    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
        {userData.profileImg ? (
            <img
                src={userData.profileImg}
                alt="profile picture"
                className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
            />
        ) : (
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png?20160314153816" // Provide the path to your default image
                alt="default profile"
                className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
            />
        )}
    </div>
    <div>
        <h2 className="text-2xl font-semibold px-3 ml-1">{userData.name}</h2>
    </div>
</div>

      <div className="flex flex-col flex-wrap space-y-5 mt-6 ">
        <div className="space-y-2 flex flex-col justify-center items-start">
          <span className="flex  items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
              <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
            </svg>
            <span className="">{userData.email}</span>
          </span>
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
              <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
            </svg>
            <span className="">{userData.mobileNo}</span>
          </span>
          <span className="flex  items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div>
              <span className=" over">{userData.address}</span></div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile