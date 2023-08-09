import * as yup from 'yup'


const profileValidation = yup.object().shape({
    name: yup.string().required("cannot be blank"),
    email: yup.string().email("Please enter a valid email").required("cannot be blank"),
    mobileNo: yup.number("only numbers allowed"),
    address: yup.string(),
    file: yup.string()
})


export default profileValidation