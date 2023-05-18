import React, { useEffect, useState } from 'react'
import UserImage from '../../components/UserImage'
import {
  Box,
  Typography,
  useTheme,
  Button,
  Input,
  useMediaQuery 
} from '@mui/material'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, picture }) => {
  const usernameCut = username.substring(0, 12)
  const theme = useTheme()

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        picturePath: picture,
        author: usernameCut,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit('send_message', messageData)
      setMessageList((list) => [...list, messageData])
      setCurrentMessage('')
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setMessageList((list) => [...list, data])
    })
    return () => socket.off('message')
  }, [socket])

  return (
      <Box
        width='100%'
        backgroundColor={theme.palette.neutral.light}
        borderRadius='0.5rem'
      >
        <Box className='chat-window'>
          <Box className='chat-body' style={{height: isNonMobileScreens ? "calc(510px - (45px + 70px))" : "83vh"}}>
            <ScrollToBottom className='message-container'>
              {messageList.map((messageContent) => {
                return (
                  <Box
                    className='message'
                    id={usernameCut === messageContent.author ? 'you' : 'other'}
                  >
                    <Box style={{display:"flex", flexDirection:"column"}}>
                      <Box className='message-content'>
                        <Typography>{messageContent.message}</Typography>
                      </Box>
                      <Box className='message-meta'>
                        {/* <Typography id='time'>{messageContent.time}</Typography> */}
                        <Typography id='author'>{messageContent.author}</Typography>
                        <UserImage size="15px" image={messageContent.picturePath}/>
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </ScrollToBottom>
          </Box>
          <Box sx={{ height: '40px', display: 'flex', paddingLeft: '10px' }}>
            <Input
              type='text'
              value={currentMessage}
              placeholder='Hey...'
              onChange={(event) => {
                setCurrentMessage(event.target.value)
              }}
              onKeyPress={(event) => {
                event.key === 'Enter' && sendMessage()
              }}
              sx={{
                display: 'grid',
                height: '100%',
                fontSize: '13px',
                width: '100%',
              }}
              disableUnderline={true}
            />
            <Button
              onClick={sendMessage}
              sx={{
                color: 'white',
                '&:hover': {
                  background: theme.palette.neutral.main,
                  color: theme.palette.neutral.light,
                },
              }}
            >
              &#9658;
            </Button>
          </Box>
        </Box>
      </Box>
  )
}

export default Chat
