import React, { useContext } from "react";
import Board from "./Board";
import { BoardContext } from "../contexts/BoardContext";

function Dashboard(props){
    const { boards } = useContext(BoardContext);

    return (
        <div className="boards" style={{ marginTop:"20px", display:"flex", justifyContent:"center" }}>
            <div style={{ margin:"10px" }}>
                <Board />
            </div>
            {!boards ? (
                <div />
            ) : (
                boards.map(board => (
                    <div key={board.boardid} style={{ margin:"10px" }}>
                        <h1>{board.title}</h1>
                        <h2>{board.description}</h2>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard; 