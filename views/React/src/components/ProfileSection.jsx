import {
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import UserImage from "../components/UserImage";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { Formik } from "formik"
import * as yup from "yup"

const editSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
})

const ProfileSection = ({ user }) => {
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [editMode, setEditMode] = useState(false);

    const initialProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    const handleEditIconClick = () => {
        setEditMode(true);
    }

    const handleSaveClick = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        try {
            const response = await fetch(`http://localhost:5000/profile/${user._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            onSubmitProps.resetForm();
        } catch (error) {
            console.error(error);
        }
        setEditMode(false);
    };

    return (
        <Formik
            onSubmit={handleSaveClick}
            validationSchema={editSchema}
            initialValues={initialProfile}
        >
            {({
                values,
                handleChange,
                handleSubmit,
                handleBlur,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Stack
                        direction={isNonMobileScreens ? "row" : "column"}
                        justifyContent="space-between"
                        alignItems="stretch"
                        sx={{ flex: 1 }}
                    >
                        {/* First Stack */}
                        <Stack
                            direction="column"
                            spacing={2}
                            justifyContent="start"
                            alignItems="center"
                            backgroundColor="red"
                            sx={{
                                width: isNonMobileScreens ? "30%" : "100%",
                            }}
                        >
                            <UserImage
                                image={`https://tophinhanhdep.com/wp-content/uploads/2021/10/Rem-Wallpapers.png`}
                                size="150px"
                            />
                        </Stack>

                        {/* Second Stack */}
                        <Stack
                            direction="column"
                            spacing={1.5}
                            justifyContent="start"
                            alignItems="start"
                            backgroundColor="yellow"
                            color="white"
                            sx={{
                                paddingTop: "2.5%",
                                width: isNonMobileScreens ? "70%" : "100%",
                            }}
                        >
                            <Typography variant="h4" gutterBottom bgcolor={"red"} margin="0" fontWeight="bold">
                                Info
                                <IconButton onClick={handleEditIconClick}>
                                    <EditIcon />
                                </IconButton>
                            </Typography>

                            <Stack direction="row">
                                <Stack
                                    marginRight={1}
                                    sx={{
                                        backgroundColor: "blue",
                                        width: "180px",
                                        height: "45px",
                                        justifyContent: "center",
                                    }}>
                                    <Typography fontWeight="bold">First name</Typography>
                                    {!editMode
                                        ? (<Typography>{user.firstName}</Typography>)
                                        : (<TextField
                                            //defaultValue={user.firstName}
                                            value={values.firstName}
                                            name="firstName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            sx={{
                                                "& fieldset": { border: 'none' },
                                                backgroundColor: "white"
                                            }}
                                            inputProps={{
                                                style: {
                                                    color: "black",
                                                    padding: 0,
                                                    height: "100%",
                                                },
                                            }}
                                        />)
                                    }

                                </Stack>
                                <Stack
                                    sx={{
                                        backgroundColor: "green",
                                        width: "180px",
                                        height: "45px",
                                        justifyContent: "center",
                                    }}>
                                    <Typography fontWeight="bold">Last name</Typography>
                                    {!editMode
                                        ? (<Typography>{user.lastName}</Typography>)
                                        : (<TextField
                                            //defaultValue={user.lastName}
                                            value={values.lastName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="lastName"
                                            sx={{
                                                "& fieldset": { border: 'none' },
                                                backgroundColor: "white"
                                            }}
                                            inputProps={{
                                                style: {
                                                    color: "black",
                                                    padding: 0,
                                                    height: "100%",
                                                },
                                            }}
                                        />)
                                    }
                                </Stack>
                            </Stack>

                            <Stack
                                sx={{
                                    backgroundColor: "blue",
                                    width: "368px",
                                    height: "45px",
                                    justifyContent: "center",
                                }}>
                                <Typography fontWeight="bold">Email</Typography>
                                {!editMode
                                    ? (<Typography>{user.email}</Typography>)
                                    : (<TextField
                                        //defaultValue={user.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
                                        value={values.email}
                                        sx={{
                                            "& fieldset": { border: 'none' },
                                            backgroundColor: "white"
                                        }}
                                        inputProps={{
                                            style: {
                                                color: "black",
                                                padding: 0,
                                                height: "100%",
                                            },
                                        }}
                                    />)
                                }
                            </Stack>
                            {editMode
                                ? <Button
                                    type="submit"
                                    sx={{
                                        backgroundColor: "green"
                                    }}
                                >
                                    Save
                                </Button>
                                : null
                            }
                        </Stack>
                    </Stack>
                </form>
            )}
        </Formik>
    );
};

export default ProfileSection;