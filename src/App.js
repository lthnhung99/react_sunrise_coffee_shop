import "./App.css";
import ThemeCustomization from './themes';
import MainContents from "./components/MainContents";
import Kitchen from "./components/Kitchen";
import { Route, Routes } from "react-router";
import Bill from "./components/pay/Bill";
import LoginForm from "./components/auth/Login";

function App() {
  return (
    <>
      <ThemeCustomization>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={<MainContents />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
      </ThemeCustomization>
    </>
  );
}

export default App;
