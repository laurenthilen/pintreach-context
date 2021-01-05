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
                                            <Button 
                                                id="btn"
                                                variant="contained" 
                                                size="small" 
                                                style={{ marginTop:30, marginBottom:30 }}
                                                target="_blank" 
                                                rel="noreferrer" 
                                                href={JSON.parse(article.article.url)}
                                            >
                                                View
                                                {/* <a target="_blank" rel="noreferrer" href={JSON.parse(article.article.url)} style={{ textDecoration:"none" }}>View</a> */}
                                            </Button>

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