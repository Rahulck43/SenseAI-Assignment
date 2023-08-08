import * as yup from 'yup';

const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const signupValidation = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("Please enter a valid email").required("required"),
    password: yup.string().matches(passwordRules, "Password must contain min 8 characters with an uppercase, number and a special character").required("required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required('re enter your password')
});

export default signupValidation;
