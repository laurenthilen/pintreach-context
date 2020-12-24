import React, { useState, useEffect} from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link } from "react-router-dom";
import * as yup from "yup";

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
});

function Login(props) {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true); 

    const handleChange = e => {
        e.persist();
        const newFormData = ({
            ...formState,
            [e.target.name]: e.target.value
        });
        validateChange(e);
        setFormState(newFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: formState.username.trim(),
            password: formState.password.trim()
        }

        axiosWithAuth()
            .post("/login", `grant_type=password&username=${user.username}&password=${user.password}`, {
                headers: {
                    Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                localStorage.setItem("token", res.data.access_token)
                props.history.push("/dashboard")
                setFormState({
                    username: "",
                    password: "",
                });
            })
            .catch(e => {
                console.log(e);
            })
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
                <div className="login-form" style={{ width:"80%", display:"flex", justifyContent:"center" }}>     
                    <form>
                        <div style={{ padding:"10px", display:"flex", flexDirection:"column", justifyContent:"flex-start" }}>
                            <CardHeader title="Log In" />
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

                            <Button 
                                disabled={buttonDisabled} 
                                variant="contained" 
                                size="small" 
                                color="secondary" 
                                style={{ marginTop: 20 }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="error" style={{ color:"red" }}>
                <error>{errors.username}</error>
                <error>{errors.password}</error>
            </div>
        </div>
    );
};

export default Login; 