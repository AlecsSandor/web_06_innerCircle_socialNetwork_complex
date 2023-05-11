import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
import ProfilePage from './scenes/profilePage'
import NotFoundPage from './scenes/notfoundPage'
import { useSelector } from 'react-redux'
import { ThemeProvider, CssBaseline } from "@mui/material"
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const theme =  createTheme(themeSettings());
  const isAuth = Boolean(useSelector((state) => state.password));

  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage /> } />
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
