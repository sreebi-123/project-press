import validator from "validator";
import isEmpty from "./isEmpty.js";

// Password validation regex: at least 1 lowercase, 1 uppercase, 1 special character, 1 number, and minimum 10 characters
const Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{10,}$/;

const signupValidation = (data) => {
    let errors = {};

    // Ensure the fields are not empty
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.whatsapp = !isEmpty(data.whatsapp) ? data.whatsapp : "";
    data.address = !isEmpty(data.address) ? data.address : "";

    // Check for missing name
    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    // Check for missing or invalid email
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }

    // Check for missing password or weak password
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } else if (!Regex.test(data.password)) {
        errors.password = "Password should have 1 uppercase, 1 lowercase, 1 special character, 1 number, and at least 10 characters";
    }

    // Phone, whatsapp, and address are optional, but can be validated if needed

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default signupValidation;
