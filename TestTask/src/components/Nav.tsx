import React, { useEffect, useState } from 'react'
import { Menu, MenuIcon } from '@fluentui/react-northstar'
import { NavLink, useNavigate } from 'react-router-dom'
import { menuItemData } from './constants/menuItemData'
import { v4 as uuid } from 'uuid'
interface MenuItem {
  key: string
  content: any
  on: string
  menu: MenuItem[] | null
}
const Nav = () => {
  const [menuData, setMenuData] = useState<any[]>(menuItemData)
  const navigate = useNavigate()
  useEffect(() => {
    const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
    if (menuBars.length === 0) {
      localStorage.setItem('menuItems', JSON.stringify(menuData))
      const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
      setMenuData([menuBars])
    } else {
      setMenuData(menuBars)
    }
  }, [])
  const [activeMenuItem, setActiveMenuItem] = useState(null)

  const handleMenuItemHover = (path: any) => {
    setActiveMenuItem(path)
  }

  const handleMenuItemClick = (path: string) => {
    navigate(`/menuItem/${path}`)
  }
  const renderMenuItems = () => {
    return menuData.map((item: any) => (
      <Menu.Item
        key={item.key}
        content={item.content}
        onClick={() => handleMenuItemClick(item.key)}
        menu={item.menu}
        on='hover'
      />
    ))
  }

  return (
    <>
      <div className='Header'>
        <NavLink className='NavItem' to='/setting'>
          <button className='MainMenuBtn'>
            <MenuIcon />
          </button>
        </NavLink>
        <div className='custom-navbar'>{renderMenuItems()}</div>
      </div>
    </>
  )
}
export default Nav
