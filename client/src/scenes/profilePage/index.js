import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../navbar"
// import FriendListWidget from "../widgets/FriendListWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget"
import UserWidget from "../widgets/UserWidget"
import { useSelector } from "react-redux"

const ProfilePage = () => {
  const loggedInUserId = useSelector((state) => state.user._id)
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET"
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column-reverse"}
        gap="2rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "0rem"}
        >
          { (userId === loggedInUserId) ? <MyPostWidget picturePath={user.picturePath} /> : null }
          <PostsWidget userId={userId} isProfile/>
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box mt="2rem 0" />
          {/* <FriendListWidget userId={userId} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
