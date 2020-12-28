import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signUpSchema as formSchema } from "./yupSchemas";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputLabel, Button, CardHeader, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
      width: "60%",
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    btn: {
        background: "rgb(8, 232, 222)",
        color: "black",
    },
}));

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
    const classes = useStyles();
    const history = useHistory();

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
                setFormState({
                    username:"",
                    primaryemail: "",
                    password: "",
                    imageurl: "",
                })
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
            <div className="form">
                <div className="form-container1">     
                    <form className={classes.root}>
                        <div className="form-container2">
                            <CardHeader title="Sign Up" style={{ marginBottom:"10px" }} />
                            <InputLabel id="auth-form-field">
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
                            { 
                                errors.username ? <Alert severity="error">{errors.username}</Alert> : null 
                            }
                            <InputLabel id="auth-form-field" style={{ marginTop: 20 }}>
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
                            { 
                                errors.password ? <Alert severity="error">{errors.password}</Alert> : null 
                            }
                            <InputLabel id="auth-form-field" style={{ marginTop: 20 }}>
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
                            { 
                                errors.primaryemail ? <Alert severity="error">{errors.primaryemail}</Alert> : null 
                            }
                            <InputLabel id="auth-form-field" style={{ marginTop: 20 }}>
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
                            { 
                                errors.imageurl ? <Alert severity="error">{errors.imageurl}</Alert> : null 
                            }
                            <Button 
                                className={classes.btn}
                                disabled={buttonDisabled} 
                                variant="contained" 
                                size="small" 
                                style={{ marginTop: 30 }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <Typography style={{ marginTop:"20px" }}>Already have an account? <Link to="/login">Log In</Link></Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp; 