import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Page from "./components/Page";
import ARPage from "./components/ARPage"; 
import StartPage from "./components/StartPage";
import WonderWall from "./components/WonderWall";

function App() {
  return <Routes>
    <Route path="/" element={<Page />}/>
    <Route index element={<StartPage />} />
    <Route path="/ar" element={<ARPage/>} />
    {/*<Route path="/wonderwall" element={<WonderWall />} />*/}
    <Route path="*" element={<div>no</div>} />
  </Routes>
}

export default App;
