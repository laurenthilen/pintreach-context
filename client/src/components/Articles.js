import React, { useContext } from "react";

import { BoardContext } from "../contexts/BoardContext";
import { useStyles } from "./theme";

import { Button, CardHeader, Card } from "@material-ui/core";

function Articles(props){
    const { articles } = useContext(BoardContext);

    return (
        <div>
            <h1>Articles</h1>
            <div className="list">
                {
                    articles.articles.map(article => (
                        <Card className="boards-container" key={article.title}>
                            <CardHeader title={article.title} />
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default Articles; 