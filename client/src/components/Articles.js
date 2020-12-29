import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { BoardContext } from "../contexts/BoardContext";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, CardHeader, CardContent, Card, Button, CardActionArea, Collapse, CardActions, IconButton } from "@material-ui/core";
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
}));

function Articles(props){
    const { articles } = useContext(BoardContext);
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState("")

    const handleExpandClick = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex("")
          } else {
            setSelectedIndex(index)
          }
    };

    return (
        <div>
            <h1>Articles</h1>
            <div className="list">
                {
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
                                <IconButton aria-label="add to favorites">
                                    <Favorite />
                                </IconButton>
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
                }
            </div>
        </div>
    );
};

export default Articles; 