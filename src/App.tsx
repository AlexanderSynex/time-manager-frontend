import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPanel from './components/AdminPanelPage/AdminPanelPage'
import WorktimePage from './components/WorktimePage/WorktimePage'
import { useState } from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import type IAuthInfo from './interfaces/UserSchema'
function App() {

  const [authInfo, setAuthInfo] = useState<IAuthInfo>({} as IAuthInfo);

  if (!authInfo.token) {
    return <LoginPage tokenSetter={setAuthInfo} />
  }

  return (
    <div className='wrapper'>
      <h1>Учет рабочего времени</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/' element={<WorktimePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
