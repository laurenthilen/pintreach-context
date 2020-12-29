import React, { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { Typography, CardHeader, Card, Button } from "@material-ui/core";

function Articles(props){
    const { articles } = useContext(BoardContext);
    const classes = useStyles();

    return (
        <div>
            <h1>Articles</h1>
            <div className="list">
                {
                    articles.map(article => (
                        <Card className="boards-container" key={article.title}>
                            <CardHeader title={article.title} />
                            <Typography>author: {article.author}</Typography>
                            <img className={classes.media} src={article.urlToImage} alt={article.title} />
                            <Button><a href={article.url} target="_blank" rel="noreferrer">View Article</a></Button>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default Articles; 