import React, { useEffect, useState } from "react";
import { Menu, MenuIcon, MenuItemProps, } from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';
import { menuItemData } from "./constants/menuItemData";
interface MenuItem {
    key: string;
    content: any;
    on: string;
    menu: MenuItem[] | null
  }
const items: any = [
      {key: "bars",  content: <NavLink className="NavItem" to="/setting"><MenuIcon /></NavLink>,  on: "clcik", menu: null}
  ];
  
const Nav = () => {
    const [menuData, setMenuData] = useState<any[]>(menuItemData);
    useEffect(() => {
        const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
        if (menuBars.length === 0) {
          localStorage.setItem("menuItems", JSON.stringify(menuData));
          const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
          setMenuData([menuBars]);
        } else {
          setMenuData(menuBars);
        }
      }, []);
    return(
        <>
        <div className="Header">
        <NavLink className="NavItem" to="/setting">
          <button className="MainMenuBtn"><MenuIcon/></button>
          </NavLink>
          <Menu defaultActiveIndex={1} items={menuData} underlined primary className="custom-navbar" />
        </div>
        </>
    );
}
export default Nav;
