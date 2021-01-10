import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddBoard from "./AddBoard";
import UpdateBoard from "./UpdateBoard";
import { BoardContext } from "../contexts/BoardContext";
import { UserContext } from "../contexts/UserContext";
import { useStyles } from "./theme";
import plus from "../assets/plus.png";

import { Button, CardHeader, Card, Modal, CardActionArea, IconButton, CardActions } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

function Dashboard(props){
    const { boards, setBoards } = useContext(BoardContext);
    const { userInfo } = useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [edit, setEdit] = useState({});

    const handleDelete = boardid => {
        axiosWithAuth()
          .delete(`/boards/board/${boardid}`)
          .then(res => {
              const newArr = boards.filter(b => b.boardid !== boardid);
              setBoards(newArr);
          })
          .catch(err => console.log(err))
    };

    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormOpen = board => {
        setEdit(board);
        setFormOpen(true);
    };
    
    const handleFormClose = () => {
        setFormOpen(false);
        setEdit({});
    };

    return (
        <div>
            <div className="profile-info">
                <img src={userInfo.imageurl} alt={userInfo.username} className="profile-img" />
                <h1>Welcome, {userInfo.username}</h1>
            </div>
            <div className="list">
                <Card className="boards-container" style={{ height:"337px" }}>
                    <Button className="boards-btn" onClick={handleOpen}>
                        <img src={plus} alt="add board" width="80px" style={{ backgroundColor:"white" }} />
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <AddBoard setOpen={setOpen} />
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
                                    <IconButton onClick={() => handleDelete(board.boardid)} >
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={() => handleFormOpen(board)}>
                                        <Edit />
                                    </IconButton>
                                    <Modal
                                        open={formOpen}
                                        onClose={handleFormClose}
                                    >
                                        <div className={classes.paper}>
                                            <UpdateBoard edit={edit} setEdit={setEdit} setFormOpen={setFormOpen} />
                                        </div>
                                    </Modal>
                                </CardActions>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard; 