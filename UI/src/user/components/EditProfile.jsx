import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiInstance from '../../utils/APIinstance'
import { useFormik } from 'formik'
import profileValidation from '../utils/profileValidationSchema'
import { useNavigate } from 'react-router-dom'


const EditProfile = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const { email, success } = useSelector((store) => store.user)

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await apiInstance.put(`/users/${email}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (response?.data?.success) {
                navigate('/profile')
            }
        } catch (error) {
            console.error(error.message)
            setApiError(error.message)

        } finally {
            setLoading(false)
        }

    }

    const { values, errors, touched, handleBlur, handleSubmit, handleChange, setValues } = useFormik({
        initialValues: {
            name: '',
            mobileNo: '',
            address: '',
            file: ''
        },
        validationSchema: profileValidation,
        onSubmit,
        enableReinitialize: true
    })

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

    useEffect(() => {
        if (!success) {
            navigate('/')
        }
    })

    useEffect(() => {
        setValues({
            name: userData.name || '',
            email: userData.email || '',
            mobileNo: userData.mobileNo || '',
            address: userData.address || ''
        });
    }, [userData]);


    return (
        <div className='p-4 px-8 border-2 rounded-lg shadow-md'>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full max-w-sm ">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="bg-gray-200  border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="name" name='name' type="text" />
                        {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 pr-4" htmlFor="mobileNo">
                            Mobile No
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={values.mobileNo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="bg-gray-200  border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="mobileNo" name='mobileNo' type="text" />
                        {errors.mobileNo && touched.mobileNo && <p className="text-red-500">{errors.mobileNo}</p>}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 pr-4" htmlFor="address">
                            Address
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="bg-gray-200 border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            id="address"
                            name="address"
                            rows="4"
                        ></textarea>
                        {errors.address && touched.address && <p className="text-red-500">{errors.address}</p>}
                    </div>
                </div>

                <div className="md:w-2/3">
                    <div className="mb-3">
                        <input className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                            type="file"
                            name="file"
                            id="file"
                            onChange={(event) => {
                                const selectedFile = event.target.files[0];
                                setValues({
                                    ...values,
                                    file: selectedFile
                                });
                            }}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    {loading ? (
                        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Updating...
                        </button>
                    ) : (
                        <div className="md:w-2/3 py-4">
                            <button type="submit" className="shadow bg-blue-600 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-semibold py-2 px-4 rounded" >
                                Save
                            </button>
                        </div>
                    )}
                    {<p className="text-red-500">{apiError}</p>}
                </div>
            </form>
        </div>
    )
}

export default EditProfile