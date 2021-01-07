import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { BoardContext } from "../contexts/BoardContext";

import { Button, CardHeader, Card } from "@material-ui/core";

function Board(props){
    const { boards } = useContext(BoardContext);
    let { boardid } = useParams();

    const board = boards.filter(b => JSON.stringify(b.boardid) === boardid);

    return (
        <div className="board-articles">
            {
                board.map(board => (
                    <div>
                        <h1 className="board-title">{board.title}</h1>
                        {
                            !board.articles ? (
                                <div />
                                ) : (
                                    board.articles.map(article => (
                                        <Card key={article.article.title} className="board-articles-card">
                                            <CardHeader title={article.article.title} className="board-articles-title" />
                                            <div className="board-articles-btn">
                                                <Button 
                                                    id="btn"
                                                    size="small"
                                                    variant="contained" 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    fullWidth
                                                    href={JSON.parse(article.article.url)}
                                                >
                                                    View
                                                </Button>
                                            </div>
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