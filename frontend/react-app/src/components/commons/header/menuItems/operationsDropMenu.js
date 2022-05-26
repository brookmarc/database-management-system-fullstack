import { CreateMenuFn } from '../utils/createDropMenu'

  let FirstLevelMenu = [
    {
      menuId: '01',
      title: 'MySQL数据库操作',
      link: "/nwms/v1/operation/mysql-crud",
      parentId: '0'
    },
  ]

  let SecoundLevelMenu = []



export const OperationsDropMenuObj = CreateMenuFn(FirstLevelMenu, SecoundLevelMenu)






