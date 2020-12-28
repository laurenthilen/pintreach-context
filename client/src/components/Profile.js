import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile(props){
    const { userInfo } = useContext(UserContext);

    return (
        <div>
            <h1>Welcome, {userInfo.username}</h1>
            <p>{userInfo.primaryemail}</p>
            <img src={userInfo.imageurl} alt={userInfo.username} />
        </div>
    );
};

export default Profile; 