import React, { useState, useContext } from "react";

import Board from "./Board";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles, getModalStyle } from "./theme";
import plus from "../assets/plus.png";

import { Typography, Button, CardHeader, Card, Modal } from "@material-ui/core";

function Dashboard(props){
    const { boards } = useContext(BoardContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div className="boards">
            <Card className="boards-container">
                <Button className="boards-btn" onClick={handleOpen}>
                    <img src={plus} alt="add board" width="100px" style={{ backgroundColor:"white" }} />
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <Board setOpen={setOpen} />
                    </div>
                </Modal>
            </Card>

            {!boards ? (
                <div />
            ) : (
                boards.map(board => (
                    <Card className="boards-container" key={board.boardid}>
                        <CardHeader title={board.title} />
                        <Typography>{board.description}</Typography>
                        <img className={classes.media} src={board.thumbnail} alt={board.title} />
                    </Card>
                ))
            )}
        </div>
    );
};

export default Dashboard; 