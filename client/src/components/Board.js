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
                    <div>
                        <h1>{board.title}</h1>
                        {
                            !board.articles ? (
                                <div />
                                ) : (
                                    board.articles.map(article => (
                                        <div key={article.article.title}>
                                        <h3>{article.article.title}</h3>
                                    {console.log(board)}
                                    </div>
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