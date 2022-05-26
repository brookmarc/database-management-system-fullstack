import { CreateMenuFn } from '../utils/createDropMenu'

  let FirstLevelMenu = [
    {
      menuId: '01',
      title: '用户管理',
      link: "/nwms/v1/admin/users",
      classes: "dropdown-menu-box",
      parentId: '0'
    },
    {
      menuId: '02',
      title: "数据库配置",
      link: "/nwms/v1/admin/db-configs",
      parentId: '0'
    },
  ]

  let SecoundLevelMenu = []


export const AdminDropMenuObj = CreateMenuFn(FirstLevelMenu, SecoundLevelMenu)






