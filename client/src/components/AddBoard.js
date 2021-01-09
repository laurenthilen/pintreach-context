import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";

import { TextField, InputLabel, Button, CardHeader } from "@material-ui/core";

function AddBoard(props) {
    const { userInfo } = useContext(UserContext)
    const { fetchBoards, isUpdated, setIsUpdated } = useContext(BoardContext)
    const [newBoard, setNewBoard] = useState({
        title: "",
        thumbnail: "",
    })

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
        <div className="add-board-form">
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
                        id="btn"
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

export default AddBoard; 