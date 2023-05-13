import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Chat from "../widgets/Chat"
import { useSelector } from "react-redux"

import io from 'socket.io-client'
import Navbar from '../navbar'
import WidgetWrapper from "../../components/WidgetWrapper"

const socket = io.connect("http://localhost:8080")

const MessagesPage = () => {
    const theme = useTheme()
    const { _id, picturePath, name } = useSelector((state) => state.user);
  return (
    <Box>
        <Navbar />
        <Box height="92vh" backgroundColor={theme.palette.background.alt} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <WidgetWrapper width="100%">
                <Chat socket={socket} username={name} picture={picturePath}/>
            </WidgetWrapper>
        </Box>
    </Box>
  )
}

export default MessagesPage
