import * as yup from 'yup'



const requestValidation= yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("email is required"),
    description: yup.string()
})


export default requestValidation