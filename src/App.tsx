import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPanel from './pages/AdminPanelPage/AdminPanelPage'
import WorktimePage from './pages/WorktimePage/WorktimePage'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import { authUser } from './requests/login/AuthUser'
import { AppBar, Avatar, Box, CircularProgress, Toolbar, Typography } from '@mui/material'
import { getUserInfo } from './requests/Info/UserInfo'
import type UserInfo from './interfaces/UserInfo'
import UserControls from './components/UserControls/UserControls'


function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    authUser().then(response => {
      if (response?.logged) {
        setLoggedIn(response?.logged);
      }
    }).catch(error => console.log(error)).finally(() => setLoading(false))
  }, []);


  useEffect(() => {
    if (loggedIn) {
      getUserInfo().then(response => {
        setUserInfo({ table_id: response?.table_id as string, personal: response?.personal });
      }).catch(error => console.log(error)).finally()
    }
  }, [loggedIn]);


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <AppBar>
        <Toolbar className='header'>
          <Typography variant='h5' sx={{ 'flexGrow': 1 }}>
            Рабочее время
          </Typography>
          {loggedIn && userInfo && <UserControls user={userInfo}/>}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!loggedIn ? <LoginPage stateModifier={setLoggedIn} /> :
          <BrowserRouter>
            <Routes>
              <Route path='/adminpanel' element={<AdminPanel />} />
              <Route path='/' element={<WorktimePage />} />
            </Routes>
          </BrowserRouter>
        }
      </Box>
    </Box>
  )
}


export default App
