import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size} sx={{ marginTop: "10%" }}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                src={`${image}`}
            />
        </Box>
    )
}

export default UserImage;
