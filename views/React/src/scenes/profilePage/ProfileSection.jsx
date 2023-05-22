import {
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import UserImage from "./UserImage";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik"
import * as yup from "yup"
import { updateUser } from "../../states";


const editSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
})


const ProfileSection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [editMode, setEditMode] = useState(false);

    const handleEditIconClick = () => {
        setEditMode(true);
    }

    const handleSaveClick = async (values, onSubmitProps) => {
        fetch(`${VITE_BASE_URL}/profile/${user._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                const updatedUser = {
                    ...user,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                };
                dispatch(updateUser({ user: updatedUser }));
                setEditMode(false);
            })
            .catch(error => console.error(error));

        setEditMode(false);
    };

    return (
        <Formik
            onSubmit={handleSaveClick}
            validationSchema={editSchema}
            initialValues={user}
        >
            {({
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



                            sx={{
                                width: isNonMobileScreens ? "30%" : "100%",
                            }}
                        >
                            <UserImage
                                image={`https://www.kindpng.com/picc/m/325-3250609_jojo-face-png-transparent-png.png`}
                                size="150px"
                            />
                        </Stack>

                        {/* Second Stack */}
                        <Stack
                            direction="column"
                            spacing={2.0}
                            justifyContent="start"
                            alignItems="start"
                            color="#060047"
                            sx={{
                                paddingTop: "2.5%",
                                paddingBottom: "2.5%",
                                width: isNonMobileScreens ? "70%" : "100%",
                            }}
                        >
                            <Typography variant="h3" margin="0" fontWeight="light" sx={{ fontFamily: 'Monospace', fontStyle: 'italic' }}>
                                Info
                                <IconButton data-testid="edit-button" onClick={handleEditIconClick}>
                                    <EditIcon />
                                </IconButton>
                            </Typography>

                            <Stack direction="row">
                                <Stack
                                    marginRight={1}
                                    sx={{

                                        width: "180px",
                                        height: "45px",
                                        justifyContent: "center",
                                    }}>
                                    <Typography fontWeight="medium">First name</Typography>
                                    {!editMode
                                        ? (<Typography data-testid="user-first-name">{user.firstName}</Typography>)
                                        : (<TextField
                                            defaultValue={user.firstName}
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
                                                "data-testid": "user-first-name-input"
                                            }}
                                        />)
                                    }

                                </Stack>
                                <Stack
                                    sx={{

                                        width: "180px",
                                        height: "45px",
                                        justifyContent: "center",
                                    }}>
                                    <Typography fontWeight="medium">Last name</Typography>
                                    {!editMode
                                        ? (<Typography data-testid="user-last-name" >{user.lastName}</Typography>)
                                        : (<TextField
                                            defaultValue={user.lastName}
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
                                                "data-testid": "user-last-name-input"
                                            }}
                                        />)
                                    }
                                </Stack>
                            </Stack>

                            <Stack
                                sx={{

                                    width: "368px",
                                    height: "45px",
                                    justifyContent: "center",
                                }}>
                                <Typography fontWeight="medium">Email</Typography>
                                {!editMode
                                    ? (<Typography data-testid="user-email">{user.email}</Typography>)
                                    : (<TextField
                                        defaultValue={user.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
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
                                            "data-testid": "user-email-input"
                                        }}
                                    />)
                                }
                            </Stack>
                            {editMode
                                ? <Button
                                    data-testid="save-button"
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