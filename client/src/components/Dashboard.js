import React from "react";

function Dashboard(props){
    if (!props.boards) {
        return <div>Loading boards...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="boards">
                {
                    props.boards.map(board => (
                        <div key={board.id}>
                            <h1>{board.name}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Dashboard; 