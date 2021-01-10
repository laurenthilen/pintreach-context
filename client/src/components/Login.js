import React, { useState, useEffect, useContext} from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";

import { loginSchema as formSchema } from "./yupSchemas";
import { useStyles } from "./theme";
import { UserContext } from "../contexts/UserContext";

import { TextField, InputLabel, Button, CardHeader, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Login(props) {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        loginfail:"",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const classes = useStyles();
    const history = useHistory(); 
    const { setLoggedin } = useContext(UserContext);

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
                setLoggedin(true)
                history.push("/dashboard")
                setFormState({
                    username: "",
                    password: "",
                });
            })
            .catch(err => {
                setErrors({loginfail: err.message});
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
        <div className="form">
            <div className="form-container1">     
                <form className={classes.root}>
                    <div className="form-container2">
                        <CardHeader title="Welcome to Pintreach" />
                        <InputLabel id="form-field">
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
                        <InputLabel id="form-field">
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
                        <Button 
                            id="btn"
                            disabled={buttonDisabled} 
                            variant="contained" 
                            size="small" 
                            style={{ marginTop: 30 }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Typography style={{ marginTop:"20px" }}>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
                        { 
                            errors.loginfail && <Alert style={{ marginTop:"20px", textAlign:"left" }} severity="error">{errors.loginfail}. Invalid username and/or password.</Alert>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 