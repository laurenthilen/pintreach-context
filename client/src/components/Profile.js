import React from "react";

function Profile(props){
    const user = props.userInfo;

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>{user.primaryemail}</p>
            <img src={user.imageurl} alt={user.username} />
        </div>
    );
};

export default Profile; 