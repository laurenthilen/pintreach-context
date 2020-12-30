import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { BoardContext } from "../contexts/BoardContext";
import { UserContext } from "../contexts/UserContext";
import { getModalStyle } from "./theme";

import { Typography, CardHeader, CardContent, Card, Modal, CardActionArea, Collapse, CardActions, IconButton, makeStyles, FormControl, Button, InputLabel, Select, MenuItem } from "@material-ui/core";
import { ExpandMore, ExpandLess, Favorite } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0 4% 2%",
    },
    container: {
        width: "100%",
        display: "flex",
    },
    left: {
        width: "55%",
        padding: "2% 6% 2% 6%",
        textAlign: "left",
    },
    right: {
        width: "25%",
        padding: "2% 6% 2% 0",
        height: 150,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    paper: {
        position: "absolute",
        width: 300,
        paddingBottom: "50px",
        borderRadius: "6px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function Articles(props){
    const { boards, articles, addArticles } = useContext(BoardContext);
    const { userInfo } = useContext(UserContext);
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState("");

    console.log(boards)
    // modal
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({});

    const handleExpandClick = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex("")
          } else {
            setSelectedIndex(index)
          }
    };

    const handleOpen = (article) => {
        setOpen(true);
        setSelectedArticle(article);
        console.log(selectedArticle)
    };
    
    const handleClose = () => {
        setOpen(false);
        setSelectedArticle([]);
    };

    // dropdown
    const [board, setBoard] = useState({});
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleChange = (event) => {
        setBoard(event.target.value);
        console.log(event.target.value, selectedArticle)
        addArticles(event.target.value.boardid, selectedArticle)
        // resets
        // setBoard({})
        // setSelectedArticle([])
        setOpen(false)
        setOpenDropdown(false)
    };

    const handleDropdownOpen = () => {
        setOpenDropdown(true);
    };
    
    const handleDropdownClose = () => {
        setOpenDropdown(false);
    };

    return (
        <div>
            <h1>Articles</h1>
            <div className="list">
                {!articles ? (
                    <div />
                ) : (
                    articles.map((article, index) => (
                        <Card className={classes.root} key={article.title}>
                            <CardActionArea 
                                key={article.title} 
                                href={article.url}
                                target="_blank"
                            >
                                <div className={classes.container}>
                                    <CardHeader
                                        className={classes.left}
                                        title={article.title}
                                        subheader={article.author}
                                    />
                                    <img className={classes.right} src={article.urlToImage} alt={article.title}/>
                                </div>
                            </CardActionArea>
                            <CardActions style={{ paddingLeft:"2%", background:"rgb(216, 216, 216, .5)" }}>
                                <IconButton onClick={() => handleOpen(article)}>
                                    <Favorite />
                                </IconButton>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <div style={modalStyle} className={classes.paper} setOpen={setOpen}>
                                        <Card>
                                            <Button className={classes.button} onClick={handleDropdownOpen}>
                                                Open the select
                                            </Button>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel>Board</InputLabel>
                                                <Select
                                                    labelId="demo-controlled-open-select-label"
                                                    id="demo-controlled-open-select"
                                                    open={open}
                                                    onClose={handleDropdownClose}
                                                    onOpen={handleDropdownOpen}
                                                    value={board}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {
                                                        boards.map((board, i) => (
                                                            <MenuItem key={board.boardid} value={board} onChange={handleChange}>{board.title}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Card>
                                    </div>
                                </Modal>

                                <IconButton onClick={() => handleExpandClick(index)}>
                                    {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </CardActions>
                            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                                <CardContent style={{ textAlign:"left", padding:"2% 6%", background:"rgb(216, 216, 216, .1)" }}>
                                    <Typography paragraph>Description:</Typography>
                                    <Typography paragraph>{article.description}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Articles; 