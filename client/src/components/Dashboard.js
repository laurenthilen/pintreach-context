import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import AddBoard from "./AddBoard";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles, getModalStyle } from "./theme";
import plus from "../assets/plus.png";

import { Button, CardHeader, Card, Modal, CardActionArea, IconButton, CardActions, InputLabel, TextField } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

function Dashboard(props){
    const { boards, setBoards, setIsUpdated } = useContext(BoardContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [editBoard, setEditBoard] = useState({
        title: "",
        thumbnail: "",
    })

    const handleDelete = boardid => {
        axiosWithAuth()
          .delete(`/boards/board/${boardid}`)
          .then(res => {
              const newArr = boards.filter(b => b.boardid !== boardid);
              setBoards(newArr);
          })
          .catch(err => console.log(err))
    };

    const handleEdit = board => {
        // const edit = boards.filter(b => b.boardid === board.boardid);

        // if user leaves a field blank, set field to initial value
        if (editBoard.title === "") {
            setEditBoard(board.title)
        } 
        if (editBoard.thumbnail === "") {
            setEditBoard(JSON.parse(board.thumbnail))
        }

        axiosWithAuth()
            .put(`/boards/board/${board.boardid}`, editBoard)
            .then(res => {
                setEditBoard({
                    title: "",
                    thumbnail: "",
                })
                setFormOpen(false)
                setIsUpdated(true)
            })
            .catch(err => console.log(err))
    };

    const handleChange = event => {
        setEditBoard({
            ...editBoard, 
            [event.target.name]: event.target.value
        })
    }

    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormOpen = () => {
        setFormOpen(true);
    };
    
    const handleFormClose = () => {
        setFormOpen(false);
    };

    return (
        <div className="list">
            <Card className="boards-container" style={{ height:"337px" }}>
                <Button className="boards-btn" onClick={handleOpen}>
                    <img src={plus} alt="add board" width="80px" style={{ backgroundColor:"white" }} />
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <AddBoard setOpen={setOpen} />
                    </div>
                </Modal>
            </Card>

            {!boards ? (
                <div />
            ) : (
                boards.map(board => (
                    <div>
                        <Card className="boards-container">
                            <CardActionArea 
                                component={Link} 
                                key={board.boardid} 
                                to={`/board/${board.boardid}`}
                            >
                                <CardHeader title={board.title} />
                                <img src={board.thumbnail} alt={board.title} width="100%" height="200px" style={{ paddingTop:"6px" }}/>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <Delete onClick={() => handleDelete(board.boardid)} />
                                </IconButton>
                                <div>
                                    <IconButton>
                                        <Edit onClick={handleFormOpen} />
                                    </IconButton>
                                    <Modal
                                        open={formOpen}
                                        onClose={handleFormClose}
                                    >
                                        <div style={modalStyle} className={classes.paper}>
                                            <div className="form">
                                                <div className="form-container1">
                                                    <form>
                                                        <CardHeader title="Update Board" />
                                                        <InputLabel id="form-field" style={{ marginTop:"2px" }}>
                                                            Name: 
                                                            <TextField
                                                                id="title"
                                                                type="text"
                                                                name="title"
                                                                value={editBoard.title}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ marginTop: 4 }}
                                                                placeholder={board.title}
                                                            />
                                                        </InputLabel>
                                                        <InputLabel id="form-field">
                                                            Thumbnail:
                                                            <TextField
                                                                type="text"
                                                                name="thumbnail"
                                                                value={editBoard.thumbnail}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ marginTop: 4 }}
                                                                placeholder={board.thumbnail}
                                                            />
                                                        </InputLabel>
                                                        <Button 
                                                            id="btn"
                                                            variant="contained" 
                                                            size="small" 
                                                            style={{ marginTop: 30 }}
                                                            fullWidth
                                                            onClick={() => handleEdit(board)}
                                                        >
                                                            Update
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </CardActions>
                        </Card>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard; 