import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { BoardContext } from "../contexts/BoardContext";

import { Typography, Button, CardHeader, Card, CardActionArea } from "@material-ui/core";

function Board(props){
    const { boards } = useContext(BoardContext);
    let { boardid } = useParams();

    const board = boards.filter(b => JSON.stringify(b.boardid) === boardid);

    return (
        <div>
            {
                board.map(board => (
                    <div>
                        <h1>{board.title}</h1>
                        {
                            !board.articles ? (
                                <div />
                                ) : (
                                    board.articles.map(article => (
                                        <Card key={article.article.title}>
                                            <CardActionArea 
                                                component={Link} 
                                                key={article.articleid} 
                                                to={article.article.url}
                                                target="_blank"
                                                rel={"external"}
                                            >
                                                <CardHeader title={article.article.title} />
                                            </CardActionArea>
                                        </Card>
                                ))
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Board; 