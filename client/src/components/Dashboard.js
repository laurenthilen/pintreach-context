import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import AddBoard from "./AddBoard";
import { BoardContext } from "../contexts/BoardContext";
import { useStyles, getModalStyle } from "./theme";
import plus from "../assets/plus.png";

import { Typography, Button, CardHeader, Card, Modal, CardActionArea } from "@material-ui/core";

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
                        <AddBoard setOpen={setOpen} />
                    </div>
                </Modal>
            </Card>

            {!boards ? (
                <div />
            ) : (
                boards.map(board => (
                    <div className={classes.cardSize}>
                        <Card key={board.boardid} style={{ paddingBottom:"0px" }}>
                            <CardActionArea component={Link} key={board.boardid} to={`/board/${board.boardid}`}>
                                <CardHeader title={board.title} />
                                <Typography>{board.description}</Typography>
                                <img className={classes.media} src={board.thumbnail} alt={board.title} />
                            </CardActionArea>
                        </Card>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard; 