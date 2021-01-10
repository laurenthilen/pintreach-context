import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { TextField, InputLabel, Button, CardHeader } from "@material-ui/core";

function AddBoard(props) {
    const { userInfo } = useContext(UserContext)
    const { fetchBoards, isUpdated, setIsUpdated } = useContext(BoardContext)
    const [newBoard, setNewBoard] = useState({
        title: "",
        thumbnail: "",
    })
    const classes = useStyles();

    const handleChange = event => {
        setNewBoard({
            ...newBoard, 
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .post("/boards/board", {
                boardid: userInfo.userid,
                title: newBoard.title,
                thumbnail: newBoard.thumbnail
            })
            .then((res) => {
                fetchBoards();
                setIsUpdated(true);
                setNewBoard({        
                    title: "",
                    thumbnail: "",
                });
                props.setOpen(false);
            })
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchBoards();
    }, [isUpdated, fetchBoards])

    return (
        <div className="form" style={{ marginTop:"20%" }}>
            <div className="form-container1">     
                <form className={classes.root}>
                    <div className="form-container2">
                        <CardHeader style={{textAlign:"center"}} title="Create Board" />
                        <InputLabel id="form-field" style={{ marginTop:"2px" }}>
                            Name: 
                            <TextField
                                id="title"
                                type="text"
                                name="title"
                                value={newBoard.title}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                style={{ marginTop: 4 }}
                                fullWidth
                            />
                        </InputLabel>
                        <InputLabel id="form-field">
                            Thumbnail:
                            <TextField
                                type="text"
                                name="thumbnail"
                                value={newBoard.thumbnail}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                style={{ marginTop: 4 }}
                                fullWidth
                            />
                        </InputLabel>
                        <Button 
                            id="btn"
                            variant="contained" 
                            size="small" 
                            style={{ marginTop: 30 }}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBoard; 