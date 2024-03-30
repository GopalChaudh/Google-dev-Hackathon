import "./App.css";
import {
  Outlet,
  Navigate,
  Route,
  Routes,
  useLocation,
  Location,
} from "react-router-dom";
import { Home, Login, Profile, Register, NotFound, About } from "./pages/index.js";

function CheckAuth() {
  const user: { token: string } = { token: "" };
  const location: Location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CheckAuth />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
		<Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
