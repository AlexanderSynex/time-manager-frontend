import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import AdminPanel from './pages/AdminPanelPage/AdminPanelPage'
import WorktimePage from './pages/WorktimePage/WorktimePage'
import { useEffect, useRef, useState } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'
import { authUser } from './requests/login/AuthUser'
import { AppBar, Box, CircularProgress, Toolbar, Typography } from '@mui/material'
import { getUserInfo } from './requests/Info/UserInfo'
import type UserInfo from './interfaces/UserInfo'
import WatchtimePage from './pages/WatchtimePage/WatchtimePage'
import UserChip from './components/UserChip/UserChip'
import type MenuEntry from './interfaces/MenuEntry'


function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>()

  const [userState, setUserState] = useState<string>("в разработке");

  const navigate = useNavigate();
  
  const menus = useRef<MenuEntry[]>([
    {label: "Сводная таблица", callback: () => {navigate("/table")}},
    {label: "Выйти", callback: () => null}
  ]);

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
          {loggedIn && userInfo && <UserChip user={userInfo} state={userState} menus={menus.current} />}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ height: '100vh', padding: '10px', display: 'flex', flex: 1, alignItems: 'start', justifyContent: 'center' }}>
        {!loggedIn ? <LoginPage stateModifier={setLoggedIn} /> :
          <Routes>
            <Route path='/' element={<WorktimePage />} />
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='/table' element={<WatchtimePage />} />
          </Routes>
        }
      </Box>
    </Box>
  )
}


export default App
