import React, { useEffect } from "react";
import { Menu, MenuIcon, MenuItemProps, } from '@fluentui/react-northstar';
import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Comman from "./Comman";
import Setting from "./Setting";
import Sidebar from "./Sidebar";
const App = () => {
  const params = useParams();
  useEffect(()=>{
    localStorage.removeItem("isChildMenu");
    localStorage.removeItem("menuItem");
  },[]);
    return(
    <BrowserRouter>
      <Routes>
          <Route index element={<Sidebar />} />
          <Route path="setting" element={<Setting />} />
          <Route path="*" element={<Comman />} />
      </Routes>
    </BrowserRouter>
    );
}
export default App;
