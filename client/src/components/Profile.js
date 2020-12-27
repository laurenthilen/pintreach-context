import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile(props){
    const { userInfo } = useContext(UserContext);

    return (
        <div>
            <h1>Welcome, {userInfo.username}</h1>
            <p>{userInfo.primaryemail}</p>
            <img src={userInfo.imageurl} alt={userInfo.username} />
            {
                !userInfo.boards ? (
                    <div>
                        <h1>No Boards!</h1>
                    </div>
                ) : (
                    userInfo.boards.map(b => (
                        <div key={b.boardid}>
                            <h1>{b.title}</h1>
                        </div>
                    ))
            )}
        </div>
    );
};

export default Profile; 