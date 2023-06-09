import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Page from "./components/Page.js";
import ARPage from "./components/ARPage.js";
import StartPage from "./components/StartPage.js";
import WonderPage from "./components/WonderPage.js";


function App() {
  return <Routes>
    <Route path="/" element={<Page />}/>
    <Route index element={<StartPage />} />
    <Route path="/ar" element={<ARPage/>} />
    <Route path="/wonderwall" element={<WonderPage />} />
    <Route path="*" element={<div>no</div>} />
  </Routes>
}

export default App;
