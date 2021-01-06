import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile(props){
    const { userInfo } = useContext(UserContext);

    return (
        <div>
            <img src={userInfo.imageurl} alt={userInfo.username} width="150px" height="150px" style={{ borderRadius:"100%" }} />
            <h1>Welcome, {userInfo.username}</h1>
            <p>{userInfo.primaryemail}</p>
        </div>
    );
};

export default Profile; 