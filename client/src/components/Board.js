import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { BoardContext } from "../contexts/BoardContext";

import { Button, CardHeader, Card } from "@material-ui/core";

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
                                        <Card key={article.article.title} style={{ display:"flex", justifyContent:"center", padding:"2% 4%", marginBottom:"4%" }}>
                                            <CardHeader title={article.article.title} style={{ paddingRight:"5%", textAlign:"left" }} />
                                            <div style={{ width:"150px", display:"flex", alignItems:"center" }}>
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