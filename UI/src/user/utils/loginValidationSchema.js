import * as yup from 'yup'



const loginValidation= yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("required"),
    password: yup.string().required("required"),
})


export default loginValidation