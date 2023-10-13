import "./App.css";

import ThemeCustomization from './themes';
import MainContents from "./components/MainContents";

function App() {
  return (
    <>
      <ThemeCustomization>
        <MainContents />
      </ThemeCustomization>
    </>
  );
}

export default App;
