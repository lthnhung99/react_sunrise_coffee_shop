import "./App.css";
import ThemeCustomization from './themes';
import MainContents from "./components/MainContents";
import Kitchen from "./components/Kitchen";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <ThemeCustomization>
        <Routes>
          <Route path="/*" element={<MainContents />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Routes>

      </ThemeCustomization>
    </>
  );
}

export default App;
