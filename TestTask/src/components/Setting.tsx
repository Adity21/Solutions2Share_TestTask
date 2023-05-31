import React, { useEffect, useState } from 'react'
import { Button, Grid, Text } from '@fluentui/react-northstar'

import { menuItemData } from './constants/menuItemData'
import Nav from './Nav'
import { ChildMenu } from './SubMenu'
import { v4 as uuid } from 'uuid'
import '../styles.css'
export interface MenuItem {
  key: string
  content: any
  on: string
  menu: MenuItem[] | null
}

export default function Setting() {
  const [menuData, setMenuData] = useState<any[]>(menuItemData)
  const [menu, setMenu] = useState<any[]>([])
  const [enteredItem, setEnteredItem] = useState<string>('')
  const [
    selectedAddEntryMenuItem,
    setSelectedAddEntryMenuItem,
  ] = useState<MenuItem | null>(null)
  useEffect(() => {
    const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
    if (menuBars.length === 0) {
      localStorage.setItem('menuItems', JSON.stringify(menuData))
      const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
      setMenu(menuBars)
      setMenuData(menuBars)
    } else {
      setMenu(menuBars)
      setMenuData(menuBars)
    }
  }, [])

  const addEnteredMenuItem = () => {
    let menuObj = {
      key: uuid(),
      content: enteredItem,
      menu: null,
      on: 'hover',
    }

    if (selectedAddEntryMenuItem !== null) {
      if (selectedAddEntryMenuItem!.menu === null) {
        selectedAddEntryMenuItem!.menu = []
      }
      selectedAddEntryMenuItem!.menu.push(menuObj)
      setMenuData([...menuData])
    } else {
      setMenuData([...menuData, menuObj])
    }
    setSelectedAddEntryMenuItem(null)
  }
  const saveEnteredMenuItems = () => {
    localStorage.setItem('menuItems', JSON.stringify(menuData))
    const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
    console.log(menuBars)
    setMenu(menuBars)
    setMenuData(menuBars)
    window.location.reload()
  }
  function removeObjectFromArray(arr: any, key: any) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === key) {
        arr.splice(i, 1)
        arr.menu = null
        return true
      }
      if (arr[i].menu) {
        if (removeObjectFromArray(arr[i].menu, key)) {
          return true
        }
      }
    }
    return false
  }

  const handleChild = (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i].menu)) {
        if (arr[i].menu.length == 0) {
          arr[i].menu = null
        } else {
          handleChild(arr[i].menu)
        }
      }
    }
    return true
  }
  const discardSelectedMenuItem = () => {
    if (selectedAddEntryMenuItem !== null) {
      const updatedItems = [...menuData]
      selectedAddEntryMenuItem!.key &&
        removeObjectFromArray(updatedItems, selectedAddEntryMenuItem!.key)
      handleChild(updatedItems)
      localStorage.setItem('menuItems', JSON.stringify(updatedItems))
      const menuBars = JSON.parse(localStorage.getItem('menuItems') || '[]')
      setMenu(menuBars)
      setMenuData(menuBars)
      window.location.reload()
    }
  }

  let isUnselected: boolean = false

  const handleItemClick = (item: MenuItem) => {
    if (selectedAddEntryMenuItem && selectedAddEntryMenuItem.key === item.key) {
      setSelectedAddEntryMenuItem(null)
      localStorage.removeItem('menuItem')
      isUnselected = true
    } else {
      setSelectedAddEntryMenuItem(item)
    }
  }

  const MenuItem = () => {
    return menuData.length > 0
      ? menuData.map((item: MenuItem, i: number) => {
          return (
            <li
              key={i + 1}
              style={{
                listStyle: 'none',
              }}
              onClick={() => {
                handleItemClick(item)
              }}
            >
              <h4>
                <span className='listName'>{i + 1}</span> {item.content}
              </h4>
              {item.menu && (
                <ul className='addEntryList'>
                  {item.menu.map((menu, idx) => {
                    return (
                      <ChildMenu
                        key={idx + menu.key}
                        onSelectMenuItem={(item) => {
                          handleItemClick(item)
                        }}
                        icon='true'
                        selectedKey={menu.key}
                        item={menu}
                      />
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })
      : ''
  }
  return (
    <>
      <Nav />
      <Grid
        className='Setting-Content'
        columns='20% 80%'
        styles={{
          gridGap: '10px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div className='settingSidebar'>
          <div className='settingSidebar-heading'>
            <Text className='Text' content={`Settings`} />
          </div>
          <ul className='settingSidebar-menu'>{MenuItem()}</ul>
        </div>
        <div className='Content'>
          <Grid
            columns='1fr'
            styles={{
              gridGap: '10px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Text className='Text' content={`Configure Navigation`} />
            <Text
              style={{ font: '12px 300' }}
              content={`The Mega Menu can be configured here`}
            />
            <Text className='Text' content={`Add Navigation`} />
            <Text
              style={{ font: '12px 300' }}
              content={`The Mega Menu can be configured here`}
            />

            <Grid
              columns='10% 50% 40%'
              styles={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '15px',
              }}
            >
              <Button
                content='+ Add entry'
                className='btnPurple'
                onClick={enteredItem != '' ? addEnteredMenuItem : () => {}}
              />
              <div className='InputGroup'>
                <input
                  type='text'
                  value={enteredItem}
                  onChange={(event) => {
                    setEnteredItem(event.target.value)
                  }}
                />
              </div>
            </Grid>
            <ul className='addEntryList'>
              {menuData.map((menu, idx) => {
                return (
                  <ChildMenu
                    key={idx + menu.key}
                    onSelectMenuItem={(item) => {
                      handleItemClick(item)
                    }}
                    selectedKey={menu.key}
                    item={menu}
                  />
                )
              })}
            </ul>
            <div className='FooterBtnPart'>
              <Button
                content='Discard'
                className='discartbtn'
                onClick={discardSelectedMenuItem}
              />
              <Button
                content='Save'
                className='btnPurple'
                onClick={saveEnteredMenuItems}
              />
            </div>
          </Grid>
        </div>
      </Grid>
    </>
  )
}
