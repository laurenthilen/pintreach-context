import React from "react";

function Profile(props){

    return (
        <div>
            <h1>Welcome, {props.userInfo.username}</h1>
        </div>
    );
};

export default Profile; 