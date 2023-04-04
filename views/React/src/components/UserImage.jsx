import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={{ size }}
                height={{ size }}
                src={`..\\..\\..\\..\\..\\server\\public\\assets\\${image}`}
            />
        </Box>
    )
}

export default UserImage;
