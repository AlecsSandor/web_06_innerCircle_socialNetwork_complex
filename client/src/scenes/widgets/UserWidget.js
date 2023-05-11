import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const href = (window.location.href).slice(-5)

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET"
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    name,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
            >
              {name}
            </Typography>
            <Typography 
              color={medium} 
              sx={{
                transition: "all 0.3s",
                "&:hover": {
                  color: palette.whiteWash,
                  cursor: "pointer",
                },}}
              onClick={() => navigate(`/profile/${userId}`)}
            >{(href === '/home') ? 'Profile' : user.email } </Typography>
          </Box>
        </FlexBetween>
        {/* <ManageAccountsOutlined /> */}
      </FlexBetween>

      <Divider sx={{backgroundColor: palette.neutral.light}}/>

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          {/* <LocationOnOutlined fontSize="large" sx={{ color: main }} /> */}
          <Typography color={medium}></Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          {/* <WorkOutlineOutlined fontSize="large" sx={{ color: main }} /> */}
          <Typography color={medium}></Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
