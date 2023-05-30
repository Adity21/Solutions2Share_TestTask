import { useEffect, useState } from "react";
import {
  Button,
  MenuIcon,
  Form,
  SearchIcon,
  Menu,
  Popup,
  Grid,
  List,
  Text,
  Tree,
} from "@fluentui/react-northstar";

import { menuItemData } from "./constants/menuItemData";
import Nav from "./Nav";
// import icon from "../images/search-icon.svg"


import { ChildMenu } from "./SubMenu";
import { v4 as uuid } from "uuid";
import "../styles.css";
export interface MenuItem {
  key: string;
  content: string;
  on: string;
  menu: MenuItem[] | null;
}
const items: any = [
  {
    index: 0,
    key: "submenuitem1",
    content: "Sub Menu Item 1",
  },
  {
    index: 1,
    key: "submenuitem2",
    content: "Sub Menu Item 2",
  },
  {
    index: 2,
    key: "submenuitem3",
    content: "Sub Menu Item 3",
    menu: {
      items: [
        { key: "company", content: "Company" },
        { key: "team", content: "Team" },
        { key: "mission", content: "Mission" },
      ],
    },
  },
];

export default function Setting() {
  const [menuData, setMenuData] = useState<any[]>(menuItemData);
  const [menu, setMenu] = useState<any[]>([]);
  const [enteredItem, setEnteredItem] = useState<string>("");
  const [selectedAddEntryMenuItem, setSelectedAddEntryMenuItem] =
    useState<MenuItem | null>(null);
  useEffect(() => {
    const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
    if (menuBars.length === 0) {
      localStorage.setItem("menuItems", JSON.stringify(menuData));
      const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
      setMenu(menuBars);
      setMenuData(menuBars);
    } else {
      setMenu(menuBars);
      setMenuData(menuBars);
    }
  }, []);

  const addEnteredMenuItem = () => {
    let menuObj = {
      key: uuid(),
      content: enteredItem,
      menu: [],
      on: "hover",
    };
    selectedAddEntryMenuItem?.menu;

    if (selectedAddEntryMenuItem?.menu) {
      selectedAddEntryMenuItem?.menu.push(menuObj);
      setMenuData([...menuData]);
    } else {
      setMenuData([...menuData, menuObj]);
    }
    setSelectedAddEntryMenuItem(null);
  };
  const saveEnteredMenuItems = () => {
    localStorage.setItem("menuItems", JSON.stringify(menuData));
    const menuBars = JSON.parse(localStorage.getItem("menuItems") || "[]");
    console.log(menuBars);
    setMenu(menuBars);
    setMenuData(menuBars);
  };
  const MenuItem = () => {
    return menuData.length > 0
      ? menuData.map((item: MenuItem, i: number) => {
        return (
          <li
            key={i + 1}
            style={{ listStyle: "none" }}
            onClick={() => {
              alert("add");
              setSelectedAddEntryMenuItem(item);
            }}
          >
            <h4>
              <span className="listName">{i + 1}</span> {item.content}
            </h4>
            {item.menu && (
              <ul className="addEntryList">
                {item.menu.map((menu, idx) => {
                  return (
                    <ChildMenu
                      key={idx + menu.key}
                      onSelectMenuItem={(item) => {
                        setSelectedAddEntryMenuItem(item);
                      }}
                      icon="true"
                      selectedKey={menu.key}
                      item={menu}
                    />
                  );
                })}
              </ul>
            )}
          </li>
        );
      })
      : "";
  };
  return (
    <>
      <Nav />
      <Grid
        className="Setting-Content"
        columns="20% 80%"
        styles={{
          gridGap: "10px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="settingSidebar">
          <div className="settingSidebar-heading">
            <Text className="Text" content={`Settings`} />
          </div>
          <ul className="settingSidebar-menu">{MenuItem()}</ul>
        </div>
        <div className="Content">
          <Grid
            columns="1fr"
            styles={{
              gridGap: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text className="Text" content={`Configure Navigation`} />
            <Text
              style={{ font: "12px 300" }}
              content={`The Mega Menu can be configured here`}
            />
            <Text className="Text" content={`Add Navigation`} />
            <Text
              style={{ font: "12px 300" }}
              content={`The Mega Menu can be configured here`}
            />

            <Grid
              columns="10% 50% 40%"
              styles={{
                display: "flex",
                justifyContent: 'flex-start',
                gap: '15px',
              }}
            >
              <Button
                content="+ Add entry"
                className="btnPurple"
                onClick={addEnteredMenuItem}
              />
              <div className="InputGroup">
                <input
                  type="text"
                  value={enteredItem}
                  onChange={(event) => {
                    setEnteredItem(event.target.value);
                  }}
                />
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" /></svg> */}
              </div>
            </Grid>
            <ul className="addEntryList">
              {menuData.map((menu, idx) => {
                return (
                  <ChildMenu
                    key={idx + menu.key}
                    onSelectMenuItem={(item) => {
                      setSelectedAddEntryMenuItem(item);
                    }}
                    selectedKey={menu.key}
                    item={menu}
                  />
                );
              })}
            </ul>
            <div className="FooterBtnPart">
              <Button
                content="Discard"
                className="discartbtn"
                onClick={saveEnteredMenuItems}
              />
              <Button
                content="Save"
                className="btnPurple"
                onClick={saveEnteredMenuItems}
              />
            </div>
          </Grid>
        </div>
      </Grid>
    </>
  );
}
