import { CreateMenuFn } from '../utils/createDropMenu'

  let FirstLevelMenu = [
    {
      menuId: '01',
      title: 'MySQL数据库管理',
      link: "/nwms/v1/db/mysql",
      parentId: '0'
    },
  ]

  let SecoundLevelMenu = []


export const DatabasesDropMenuObj = CreateMenuFn(FirstLevelMenu, SecoundLevelMenu)






