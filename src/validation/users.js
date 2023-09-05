import * as yup from "yup"

//create a validation schema for user
export const userSchema = yup.object().shape({
    username: yup.string().required("Username Required"),
    password: yup.string().required("Password Required")
})