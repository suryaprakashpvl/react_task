import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Register from './pages/register';
import Login from './pages/login';
import Home from "./pages/home"
import ProtectedRoute from "./routerCheck/ProtectRouter"
import ProtectedRouteLogin from "./routerCheck/ProtectRouterLogin"
function App() {
  return (
    <div className="App">
   <Router>
      <Routes>
      
      <Route element={<ProtectedRouteLogin />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />

      </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
