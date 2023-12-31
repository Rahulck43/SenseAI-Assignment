import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import signupValidation from '../utils/signupValidationSchema'
import apiInstance from '../../utils/APIinstance'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../utils/userSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [loginError, setLoginError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((store) => store.user.success)

  const onSubmit = async (values) => {
    try {
      const response = await apiInstance.post(`/signup/${token}`, values)
      const { user, success, message } = response.data;
      if (!success) {
        setLoginError(message)
      } else {
        dispatch(login({ user }))
        setLoginError('')
      }
    } catch (error) {
      if (error.response) {
        const { success, message } = error.response.data
        if (!success) {
          setLoginError(message)
        }
      } else {
        console.error('API error:', error)
        setLoginError(error)
        navigate('/')
      }
    }
  }

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signupValidation,
    onSubmit
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn])

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div>
              <img src="https://uploads-ssl.webflow.com/622f09894fc230ad07de84a9/63b9621e9d70bbceb4c467b2_Group%2085685.svg" alt="logo" className='h-96 w-96' />
            </div>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Signup
              </h2>
              <form onSubmit={handleSubmit} className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="name" className="text-gray-500 mb-2">Name </label>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Please insert your name"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                  {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}
                </div>
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
                    autoComplete="username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                  {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">Password</label>
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    id="password"
                    name='password'
                    placeholder="Please insert your password"
                    autoComplete="new-password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                  {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="confirmPassword" className="text-gray-500 mb-2">Confirm Password</label>
                  <input
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    id="confirmPassword"
                    name='confirmPassword'
                    placeholder="Please re enter your password"
                    autoComplete="new-password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                  {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
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
                      <div className="font-bold">Sigin</div>
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
                <p className="text-red-500">{loginError}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register