import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import loginValidation from '../utils/loginValidationSchema'
import apiInstance from '../../utils/APIinstance'
import { useDispatch, useSelector} from 'react-redux'
import { login } from '../utils/adminSlice'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [loginError, setLoginError] = useState('')
    const admin = useSelector((store) => store.admin)
    const isLoggedIn = admin.success;




    const onSubmit = async (values) => {
        console.log('at onsubmit')
        try {
            const response = await apiInstance.post('/admin/login', values)
            const { success, message } = response.data;
            if (success) {
                dispatch(login())
                navigate('/admin/dashboard')
            } else {
                setLoginError(message)
            }
        } catch (error) {
            console.error('API error:', error)
            if (error.response) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('Network or server error occurred.');
            }
        }
    }

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: loginValidation,
        onSubmit
    })

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/admin/dashboard')
        } 
      }, [isLoggedIn])

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
                <label className="font-semibold text-xs" htmlFor="usernameField">Username or Email</label>
                <input value={values.userName} onBlur={handleBlur} onChange={handleChange} className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" id='userName' name='userName' />
                {errors.userName && touched.userName && <p className="text-red-500">{errors.userName}</p>}
                <label className="font-semibold text-xs mt-3" htmlFor="password">Password</label>
                <input value={values.password} onBlur={handleBlur} onChange={handleChange} className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" id='password' name='password' />
                {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
                <button type='submit' className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
                <p className="text-red-500 text-xs">{loginError}</p>
            </form>
        </div>
    )
}

export default Login
