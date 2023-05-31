import { MenuIcon } from '@fluentui/react-northstar';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
interface MenuItem {
    key: string;
    content: any;
    on: string;
    menu: MenuItem[] | null
  }
// Static Menu Data
export const menuItemData: MenuItem[] = [];
