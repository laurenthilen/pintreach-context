import * as yup from "yup"

export const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .min(2, "Username must be at least 2 characters long.")
        .required("Username is required."),
    password: yup
        .string()
        .min(6, "Passwords must be at least 6 characters long.")
        .required("Must include password."),
    primaryemail: yup
        .string()
        .email("Must be a valid email address.")
        .required("Must include email address."),
    imageurl: yup
        .string()
        .required("Please enter your imageurl."),
});

export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .min(2, "Username must be at least 2 characters long.")
        .required("Username is required."),
    password: yup
        .string()
        .min(6, "Passwords must be at least 6 characters long.")
        .required("Must include password."),
});