import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  return (
    <Box height="100vh" backgroundColor={theme.palette.whiteWash} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Box
        width='100%'
        backgroundColor={theme.palette.whiteWash}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color= {theme.palette.background.default}>
          inner◉
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor='none'
      >
        <Typography fontWeight='200' textAlign="center" variant='h5' sx={{ mb: '1.5rem'}} color= {theme.palette.background.default}>
          Welcome to the Inner circle!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
