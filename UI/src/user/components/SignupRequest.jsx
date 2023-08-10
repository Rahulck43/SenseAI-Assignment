import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import apiInstance from '../../utils/APIinstance'
import { useSelector } from 'react-redux'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import requestValidation from '../utils/requestValidation'
import Register from './Register'


const SignupRequest = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    console.log(token)

    const [resMessage, setResMessage] = useState('')
    const [istoken, setIsToken] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useSelector((store) => store.user.success)

    const onSubmit = async (values) => {
        try {
            const response = await apiInstance.post('/request', values)
            console.log(response.data)
            const { user, success, message } = response.data;
            setResMessage(message)
        } catch (error) {
            if (error.response) {
                const { success, message } = error.response.data
                setResMessage(message)
            } else {
                console.error('API error:', error)
                setResMessage(error)
                navigate('/')
            }
        }
    }

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {

            email: '',
            description: ''
        },
        validationSchema: requestValidation,
        onSubmit
    })
  
    useEffect(() => {
        if (token) {
            async function checkToken(){
                try {
                    const response = await apiInstance.get(`/verify-token/${token}`);
                    console.log(response.data)
                    if (response.data.success) {
                        setIsToken(true);
                    }
                } catch (error) {
                    if (error.response) {
                        // Handle API error response
                        console.error('API error:', error.response.data);
                        // setResMessage(error.response.data.message);
                    } else {
                        // Handle other errors
                        console.error('Error verifying token:', error);
                        setResMessage('Unexpected network error');
                    }
                }
            }
            checkToken();
        }
    },[])

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/profile')
        }
    }, [isLoggedIn])

    return (
        <>
            {!istoken ? (<div className="antialiased bg-gradient-to-br from-green-100 to-white">
                <div className="container px-6 mx-auto">
                    <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
                        <div className="flex flex-col w-full">
                            <div>
                                <img src="https://uploads-ssl.webflow.com/622f09894fc230ad07de84a9/63b9621e9d70bbceb4c467b2_Group%2085685.svg" alt="logo" className='h-96 w-96' />
                            </div>
                        </div>
                        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
                            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                                {!resMessage && <h2 className="font-thin text-xl  text-gray-800 text-left mb-5">
                                oops...!!! You are not Authorised. <br />
                                    No worries,you can request a registration link from the admin here
                                </h2>}
                                <form onSubmit={handleSubmit} className="w-full">

                                    <div id="input" className="flex flex-col w-full my-5">
                                        <label htmlFor="email" className="text-gray-500 mb-2">Email </label>
                                        <input
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="text"
                                            id="email"
                                            name='email'
                                            placeholder="Please insert your email"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                        />
                                        {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>
                                    <div id="input" className="flex flex-col w-full my-5">
                                        <label htmlFor="description" className="text-gray-500 mb-2">Description </label>
                                        <input
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="text"
                                            id="description"
                                            name='description'
                                            placeholder="enter your message to admin"
                                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                        />
                                        {errors.email && touched.email && <p className="text-red-500">{errors.description}</p>}
                                    </div>
                                    <div id="button" className="flex flex-col w-full my-5">
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                                        >
                                            <div className="flex flex-row items-center justify-center">
                                                <div className="mr-2">
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="font-bold">Request</div>
                                            </div>
                                        </button>
                                        <div className="flex justify-evenly mt-5">
                                            <Link
                                                to="/"
                                                className="text-black-500 font-bold hover:text-red-700"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    </div>
                                    <p className="text-green-600">{resMessage}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (<Register />)}</>
    )
}

export default SignupRequest