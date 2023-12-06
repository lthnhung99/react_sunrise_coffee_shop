import "./App.css";
import ThemeCustomization from './themes';
import MainContents from "./components/main/MainContents";
import Kitchen from "./components/kitchen/Kitchen";
import { Route, Routes } from "react-router";
import LoginForm from "./components/auth/Login";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFoundPage from "./components/NotFoundPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  const user = useSelector(state => state.main.auth.roles.authority || localStorage.getItem("roles"));
  return (
    <>
      <ThemeCustomization>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={
            <PrivateRoute user={user}>
              <MainContents />
            </PrivateRoute>
          } />
          <Route path="/kitchen" element={
            <PrivateRoute user={user}>
              <Kitchen />
            </PrivateRoute>
          } />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </ThemeCustomization>
    </>
  );
}

export default App;
