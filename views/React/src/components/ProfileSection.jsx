import {
    Button,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import UserImage from "../components/UserImage";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import { useState } from "react";

const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const [editMode, setEditMode] = useState(false);
const handleEditIconClick = () => {
    setEditMode(true);
}

const handleSaveClick = () => {
    setEditMode(false);
};
const ProfileSection = (user) => {
    return (
        <Stack
            direction={isNonMobileScreens ? "row" : "column"}
            justifyContent="space-between"
            alignItems="stretch"
            sx={{ flex: 1 }}
        >
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
                    size="100px"
                />
            </Stack>
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
                        sx={{
                            backgroundColor: "blue",
                            width: "180px",
                            height: "45px",
                            justifyContent: "center",
                        }}>
                        <Typography fontWeight="bold">First name</Typography>
                        {!editMode
                            ? (<Typography>{user.firstName}</Typography>)
                            : (<TextField defaultValue={user.firstName} />)
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
                            : (<TextField defaultValue={user.lastName} />)
                        }
                    </Stack>
                </Stack>

                <Stack
                    sx={{
                        backgroundColor: "blue",
                        width: "180px",
                        height: "45px",
                        justifyContent: "center",
                    }}>
                    <Typography fontWeight="bold">Email</Typography>
                    {!editMode
                        ? (<Typography>{user.email}</Typography>)
                        : (<TextField defaultValue={user.email} />)
                    }
                </Stack>
                {editMode
                    ? <Button
                        onClick={handleSaveClick}
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
    )
}

export default ProfileSection;