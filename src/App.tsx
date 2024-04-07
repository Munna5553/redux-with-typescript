import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import SignIn from './components/Signin';
import Signup from './components/Signup';
import { useAppSelector } from './Features/hook';
import Profile from './pages/Profile';

const App = () => {

  const { success, loading } = useAppSelector((state) => state.auth)

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Route path='*' element={!success && <Navigate to={"/sign-in"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;