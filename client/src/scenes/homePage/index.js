import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "../navbar"
import UserWidget from "../widgets/UserWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostsWidget"

import Chat from "../widgets/Chat"
import io from 'socket.io-client'
import WidgetWrapper from "../../components/WidgetWrapper"
const socket = io.connect("http://localhost:8080")

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, name } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="3.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box> 
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} display={isNonMobileScreens ? "" : "none"}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box style={{ width: '100%', position: 'sticky'}} pt='2rem'>
            <WidgetWrapper>
              <Chat socket={socket} username={name} picture={picturePath}></Chat>
            </WidgetWrapper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
