import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login/Login';
import { EmailProvider } from './context/EmailContext';
import Password from './pages/PasswordRecover/Password';
import Home from './pages/Home/Home';

function App() {
  return (
    <EmailProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/sidebar' element={<Sidebar />} />
            <Route path='/passwordrecover' element={<Password/>}/>

          </Routes>
        </Router>
      </UserProvider>
    </EmailProvider>
  );
}

export default App;
