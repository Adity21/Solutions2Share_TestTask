import React from 'react'
import { ComposeIcon } from '@fluentui/react-northstar'
import { FC } from 'react'

export interface MenuItem {
  key: string
  content: string
  on: string
  menu: MenuItem[] | null
}

interface ChildMenuProps {
  item: MenuItem
  icon?: any
  selectedKey: string
  onSelectMenuItem: (item: MenuItem) => void
}

export const ChildMenu: FC<ChildMenuProps> = ({
  item,
  icon,
  selectedKey,
  onSelectMenuItem,
}) => {
  return (
    <ul className='menuItem' key={item.key + item.content}>
      <li
        className={
          localStorage.getItem('menuItem') !== null &&
          localStorage.getItem('menuItem') === item.key
            ? 'addedMenu-link active'
            : 'addedMenu-link'
        }
        onClick={() => {
          onSelectMenuItem(item)
          localStorage.setItem('isChildMenu', JSON.stringify(true))
          localStorage.setItem('menuItem', item.key)
        }}
      >
        {icon && <ComposeIcon />}
        {item.content}
      </li>
      {Array.isArray(item.menu)
        ? item.menu.length > 0 &&
          item.menu.map((subMenu, idx) => {
            return (
              <ChildMenu
                key={idx + subMenu.key}
                onSelectMenuItem={(key) => onSelectMenuItem(key)}
                selectedKey={selectedKey}
                icon={icon}
                item={subMenu}
              />
            )
          })
        : null}
    </ul>
  )
}
