import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { BoardContext } from "../contexts/BoardContext";

function Board(props){
    const { boards } = useContext(BoardContext);
    let { boardid } = useParams();

    const board = boards.filter(b => JSON.stringify(b.boardid) === boardid);

    return (
        <div>
            {
                board.map(board => (
                    <h1>{board.title}</h1>
                ))

            }
            {
                !board.articles ? (
                    <div />
                ) : (
                    board.articles.map(article => (
                        <h1>{article.title}</h1>
                    ))
                )
            }
        </div>
    );
};

export default Board; 