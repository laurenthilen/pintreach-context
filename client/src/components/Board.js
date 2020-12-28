import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { UserContext } from "../contexts/UserContext";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { TextField, InputLabel, Button } from "@material-ui/core";

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
        // event.persist();
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
            })
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchBoards();
    }, [isUpdated])

    return (
        <div>
            <div style={{ display:"flex", justifyContent:"center" }}>
                <div className="board-form" style={{ width:"80%", display:"flex", justifyContent:"center" }}>
                    <form>
                        <InputLabel 
                            style={{ 
                                display:"flex",        
                                flexDirection:"column", 
                                alignItems:"flex-start"
                            }}
                        >
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
                        <InputLabel 
                            style={{ 
                                display:"flex", 
                                flexDirection:"column", 
                                alignItems:"flex-start",
                                marginTop: 10 
                            }}
                        >
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
                        <InputLabel 
                            style={{ 
                                display:"flex", 
                                flexDirection:"column", 
                                alignItems:"flex-start",
                                marginTop: 10 
                            }}
                        >
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
                            style={{ marginTop: 20 }}
                            onClick={handleSubmit}
                        >
                            Add Board
                        </Button>
                     </form>
                </div>
            </div>
    </div>
    );
};

export default Board; 