import validator from "validator";
import isEmpty from "./isEmpty.js";
export default function signinValidation(data) {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""


    ///for checking emails

    if (validator.isEmpty(data.email)) {
        errors.email = "email field is required"
    }
    else if(!validator.isEmail(data.email)){
        errors.email = "check the format of email"
    }


    //for checking password

    if (validator.isEmpty(data.password)) {
        errors.password = "password required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}