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
export const menuItemData: MenuItem[] = [
    // {
    //     key: uuid(),
    //     content: "Header",
    //     on: "hover",
    //     menu: [
    //         {
    //             key: uuid(),
    //             content: "Sub Header 1",
    //             on: "hover",
    //             menu: [
    //                 {
    //                     key: uuid(),
    //                     content: "Nester Sub header",
    //                     on: "hover",
    //                     menu: []
    //                 },
    //             ],
    //         }
    //     ],
    // },
    // {
    //     key: uuid(),
    //     content: "Tutorial",
    //     on: "hover",
    //     menu: [
    //         {
    //             key: uuid(),
    //             content: "Sub Tutorial",
    //             on: "hover",
    //             menu: [
    //                 {
    //                     key: uuid(),
    //                     content: "Nester Sub Tutorial 1",
    //                     on: "hover",
    //                     menu: []
    //                 },

    //             ],
    //         },
    //     ],
    // },
];