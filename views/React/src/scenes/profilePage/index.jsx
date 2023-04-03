import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        console.log(userId);
        const response = await fetch(`http://localhost:5000/profile/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {user.userId} </p>
            <p><strong>Password:</strong> {user.userId}</p>
            <p><strong>Email:</strong> {user.userId}</p>
        </div>
    );
};

export default ProfilePage;