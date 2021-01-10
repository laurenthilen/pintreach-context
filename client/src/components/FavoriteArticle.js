import React, { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { Close } from "@material-ui/icons";
import { Button, InputLabel, Select, MenuItem, IconButton, CardActions } from "@material-ui/core";

function FavoriteArticle(props){
    const { boards } = useContext(BoardContext);
    const classes = useStyles();

    return (
        <div className="form" style={{ marginTop:"20%"}}>
            <div className="form-container1"> 
                <form className={classes.root}>
                    <div className="form-container2">
                        <CardActions style={{flex:"display", justifyContent:"flex-end"}}>
                            <IconButton onClick={props.handleClose}>
                                <Close />
                            </IconButton>
                        </CardActions>
                        <Button onClick={props.handleDropdownOpen}>
                            Select a board:
                        </Button>
                        <InputLabel>Board</InputLabel>
                        <Select
                            open={props.open}
                            onClose={props.handleDropdownClose}
                            onOpen={props.handleDropdownOpen}
                            value=""
                            onChange={props.handleChange}
                        >
                            {
                                boards.map(board => (
                                    <MenuItem 
                                        key={board.boardid} 
                                        value={board} 
                                        onChange={props.handleChange}
                                    >
                                        {board.title}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FavoriteArticle; 