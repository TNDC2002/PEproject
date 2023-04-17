import {
    Box,
    Button,
    TextField,
    useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserImage from "../../components/UserImage";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const userID = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/profile/${userID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    const update = async () => {

    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    const handleFormSubmit = () => {

    }

    return (
        <div>
            <Navbar />
            <UserImage image={`${user.picturePath}`} />
            <Formik
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <TextField
                        label="FirstName"
                        type="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 4" }}
                    />
                    // <h1>User Profile</h1>
                    // <p>
                    //     <strong>Username:</strong> {`${user.firstName} ${user.lastName}`}
                    // </p>
                    // <p>
                    //     <strong>Password:</strong> {user.password}
                    // </p>
                    // <p>
                    //     <strong>Email:</strong> {user.email}
                    // </p>
                )}
            </Formik>
        </div>
    );
};

export default ProfilePage;
