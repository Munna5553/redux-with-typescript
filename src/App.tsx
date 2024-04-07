import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import SignIn from './components/Signin';
import Signup from './components/Signup';
import { useAppSelector } from './Features/hook';
import Profile from './pages/Profile';

const App = () => {

  const { success } = useAppSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        {
          success &&
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </>
        }
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='*' element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;