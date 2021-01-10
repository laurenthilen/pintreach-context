import React, { useState, useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import FavoriteArticle from "./FavoriteArticle";

import { Typography, CardHeader, CardContent, Card, Modal, CardActionArea, Collapse, CardActions, IconButton, makeStyles } from "@material-ui/core";
import { ExpandMore, ExpandLess, Favorite } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "2%",
        [theme.breakpoints.down("sm")]: {
            margin: "4%"
        }
    },
    container: {
        width: "100%",
        display: "flex",
    },
    left: {
        width: "55%",
        padding: "2% 6% 2% 6%",
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        }
    },
    right: {
        width: "25%",
        padding: "2% 6% 2% 0",
        height: 150,
        [theme.breakpoints.down("sm")]: {
            width: "0"
        }
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
}));

function Articles(props){
    const { articles, addArticles } = useContext(BoardContext);
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState("");

    // modal
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

    };
    
    const handleClose = () => {
        setOpen(false);
        setSelectedArticle([]);
    };

    // dropdown
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        addArticles(event.target.value, selectedArticle)
        setOpen(false)
        setOpenDropdown(!openDropdown)
    };

    const handleDropdownOpen = () => {
        setOpenDropdown(true);
    };
    
    const handleDropdownClose = () => {
        setOpenDropdown(false);
    };

    return (
        <div>
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
                            <CardActions>
                                <IconButton onClick={() => handleOpen(article)}>
                                    <Favorite />
                                </IconButton>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    style={{ backgroundColor:"rgb(255, 255, 255, .7)" }}
                                >
                                    <FavoriteArticle 
                                        handleClose={handleClose}
                                        handleChange={handleChange} 
                                        handleDropdownOpen={handleDropdownOpen}
                                        handleDropdownClose={handleDropdownClose}
                                        setOpen={setOpen}
                                    />
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