import React, { useContext } from "react";

import Board from "./Board";
import { BoardContext } from "../contexts/BoardContext";

function Dashboard(props){
    const { boards } = useContext(BoardContext);

    return (
        <div className="boards-container" style={{ margin:"2%", display:"flex", flexWrap:"wrap", justifyContent:"space-evenly" }}>
            <div style={{ width:"300px", height:"250px", marginBottom:"4%" }}>
                <Board />
            </div>
            {!boards ? (
                <div />
            ) : (
                boards.map(board => (
                    <div key={board.boardid} style={{ width:"300px", height:"250px", marginBottom:"4%" }}>
                        <h1>{board.title}</h1>
                        <h2>{board.description}</h2>
                        <img src={board.thumbnail} alt={board.title} width="100%" height="100px" />
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard; 