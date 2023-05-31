interface MenuItem {
  key: string
  content: any
  on: string
  menu: MenuItem[] | null
}
export const menuItemData: MenuItem[] = []
