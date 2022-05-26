//import { types, getSnapshot, flow } from "mobx-state-tree"
import { types, flow } from "mobx-state-tree"

export const UserRowData = types.model("UserRowData", {
  Fullname: types.string,
  Username: types.string,
  Password: types.string,
  AccessLevel: types.number,
})

export const UserStore = types
  .model("UserStore", {
    selUserKeys: types.optional(types.array(types.string), []), 
    oneUserData: types.optional(types.array(UserRowData), []), 
  })
  .actions(self => ({
    // eslint-disable-next-line
    setUserKeys: flow(function* setUserKeys(userKeys) {
      try {
        self.selUserKeys = userKeys
      } catch (error) {
        console.log('Failed to set user keys!')
      }
    })
  }))
  .actions(self => ({
    // eslint-disable-next-line
    setUserData: flow(function* setUserData(userData) {
      try {
	self.oneUserData = userData.map(obj => (
          {
            Fullname: obj.fullname,
	    Username: obj.username,
	    Password: obj.password,
	    AccessLevel: obj.accesslevel
	  }
	))
      } catch (error) {
        console.log('Failed to set user data')
      }
    })
  }))

export const userStore = UserStore.create({}) 

//console.log(getSnapshot(userStore))

