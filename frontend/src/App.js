import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home, Login, NotFound, Profile, Register } from './pages';
import { useSelector } from 'react-redux';
import ChatBot from './pages/ChatBot';

function Layout() {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();

    return (user) ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
}

function App() {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div data-theme={theme} className='w-full min-h-[100vh]'>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile/:id?' element={<Profile />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/ChatBot' element={<ChatBot />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;