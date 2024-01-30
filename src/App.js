
import { Toaster } from 'react-hot-toast';
import Background from './Background';
import './App.css';
import ChangePassword from './components/ChangePassword';
import ForgetPassword from './components/ForgetPassword';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Verification from './components/Verification';
import { UserProvider } from './context/UserContext';
import Login from "./components/Login";
import Home from "./pages/Home";

function App() {
  return (
<>
<UserProvider>
  <Background/>
  <Toaster/>
  <Routes>
  <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home/>} />
  </Routes>
</UserProvider>
</>
  );
}

export default App;
