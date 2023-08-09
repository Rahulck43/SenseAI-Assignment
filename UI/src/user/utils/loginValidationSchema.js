import * as yup from 'yup'



const loginValidation= yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("email is required"),
    password: yup.string().required("password is required"),
})


export default loginValidation