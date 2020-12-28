import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { TextField, InputLabel, Button, CardHeader, Card } from "@material-ui/core";

function Board(props) {
    const { userInfo } = useContext(UserContext)
    const { fetchBoards, isUpdated, setIsUpdated } = useContext(BoardContext)
    const [newBoard, setNewBoard] = useState({
        title: "",
        description: "",
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
                description: newBoard.description,
                thumbnail: newBoard.thumbnail
            })
            .then((res) => {
                setIsUpdated(true)
                setNewBoard({        
                    title: "",
                    description: "",
                    thumbnail: "",
                });
                props.setOpen(false);
            })
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchBoards();
    }, [isUpdated])

    return (
        <div className="form">
            <div className="form-container1">
                <form>
                    <CardHeader title="Create Board" />
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
                        />
                    </InputLabel>
                    <InputLabel id="form-field">
                        Description:
                        <TextField
                            type="text"
                            name="description"
                            value={newBoard.description}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            style={{ marginTop: 4 }}
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
                        />
                    </InputLabel>
                    <Button 
                        className={classes.btn} 
                        variant="contained" 
                        size="small" 
                        style={{ marginTop: 30 }}
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Board; 