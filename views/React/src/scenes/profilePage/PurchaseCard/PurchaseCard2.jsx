import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SmashDong300 from '../../../assets/image/SmashDong600.png';
import Buy300 from '../../../assets/image/Buy600.png';
import { updateUser } from "../../../states";
import { useSelector, useDispatch } from "react-redux";
const StyledCard = styled(Card)({
  width: '200px',
  height: '80px',
  backgroundImage: `url(${SmashDong300})`, backgroundSize: "cover",
  backgroundPosition: "center",
  transition: 'all 0.4s',
  borderRadius: '30px',
  boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.705)',
  fontSize: '30px',
  fontWeight: '900',
  border: '3px solid white',
  '& .second-content': {
    opacity: 0,
    height: '0px',
  },
  '&:hover': {
    borderRadius: '15px',
    cursor: 'pointer',
    transform: 'scale(1.2)',
    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.705)',
    backgroundImage: `url(${Buy300})`, backgroundSize: "cover",
    backgroundPosition: "center",
    '& .first-content': {
      height: '0px',
      opacity: 0,
    },
    '& .second-content': {
      opacity: 1,
      height: '100%',
      borderRadius: '40px',

    },
  },
});

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function PurchaseCard2() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (amount) => {
    fetch(`${VITE_BASE_URL}/profile/${user._id}/purchase`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ balance: amount }),
      credentials: "include",

    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUser = {
          ...user,
          balance: data.balance,
        };
        dispatch(updateUser({ user: updatedUser }));
      })
      .catch((error) => console.error(error));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledCard onClick={() => handleClickOpen(900)}>
        <CardContent className="first-content"></CardContent>
        <CardContent className="second-content"></CardContent>
      </StyledCard>

      <Dialog open={open} onClose={handleClose}>
        <StyledDialogContent>
          <Typography variant="h6">Purchased successful</Typography>
        </StyledDialogContent>
      </Dialog>
    </div>
  );
}