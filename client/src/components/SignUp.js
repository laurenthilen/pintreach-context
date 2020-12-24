import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom"
import * as yup from 'yup';

import { TextField, InputLabel, Button, CardHeader } from "@material-ui/core";

const formSchema = yup.object().shape({
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

function SignUp(props){
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        primaryemail: "",
        imageurl: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        primaryemail: "",
        imageurl: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [post, setPost] = useState([]);
    const history = { useHistory };

    const handleChange = e => {
        e.persist();
        const newFormData = ({
            ...formState,
            [e.target.name]: e.target.value
        });
        validateChange(e);
        setFormState(newFormData);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("https://laurene-pintreach.herokuapp.com/registeruser", formState)
            .then(response => { 
                setPost([...post, response.data]);
                setFormState({
                    username:"",
                    primaryemail: "",
                    password: "",
                    imageurl: "",
                })
                console.log("Response:", response.data)
                history.push("/login")  
            })
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        formSchema.isValid(formState).then((valid) => {
            setButtonDisabled(!valid);
          });
    }, [formState])

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(() => {
            setErrors({
                ...errors,
                [event.target.name]:""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [event.target.name]: err.errors[0]
            });
        });
    };

    return (
        <div>
            <div style={{ display:"flex", justifyContent:"center" }}>
                <div className="signup-form" style={{ width:"80%", display:"flex", justifyContent:"center" }}>     
                    <form onSubmit={handleSubmit}>
                        <div style={{ padding:"10px", display:"flex", flexDirection:"column", justifyContent:"flex-start" }}>
                            <CardHeader title="Sign Up" />
                            <InputLabel style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
                                Username: 
                                <TextField
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    style={{ marginTop: 4 }}
                                    error={errors.username}
                                />
                            </InputLabel>
                            <InputLabel style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", marginTop: 10 }}>
                                Password: 
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    style={{ marginTop: 4 }}
                                    error={errors.password}
                                />
                            </InputLabel>
                            <InputLabel style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", marginTop: 10 }}>
                                Email: 
                                <TextField
                                    id="primaryemail"
                                    type="email"
                                    name="primaryemail"
                                    value={formState.primaryemail}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    style={{ marginTop: 4 }}
                                    error={errors.primaryemail}
                                />
                            </InputLabel>
                            <InputLabel style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", marginTop: 10 }}>
                                Profile Image: 
                                <TextField
                                    id="imageurl"
                                    type="text"
                                    name="imageurl"
                                    value={formState.imageurl}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    style={{ marginTop: 4 }}
                                    error={errors.imageurl}
                                />
                            </InputLabel>

                            <Button disabled={buttonDisabled} variant="contained" size="small" color="secondary" style={{ marginTop: 20 }}>Submit</Button>
                            <p>Already have an account? <Link to="/login">Log In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="error" style={{ color:"red" }}>
                <error>{errors.username}</error>
                <error>{errors.primaryemail}</error>
                <error>{errors.password}</error>
                <error>{errors.imageurl}</error>
            </div>
        </div>
    );
};

export default SignUp; 