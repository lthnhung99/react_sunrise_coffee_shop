import "./App.css";
import ThemeCustomization from './themes';
import MainContents from "./components/MainContents";
import Kitchen from "./components/Kitchen";
import { Route, Routes } from "react-router";
import LoginForm from "./components/auth/Login";
// import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // const user = useSelector(state => state.main.auth);
  const user = localStorage.getItem("roles");
  return (
    <>
      <ThemeCustomization>
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
        </Routes>
      </ThemeCustomization>
    </>
  );
}

export default App;
