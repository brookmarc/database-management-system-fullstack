import React from 'react'
import styled from 'styled-components'
import { useMutation } from "@apollo/client"
import { DELETE_USER, FETCH_USERS } from '../graphql/gqlTypes'
import { observer } from 'mobx-react'
import { userStore } from '../mst/userStore'

const DeleteUser = observer(({closeModal, closeMore}) => {
  const selectedUserKeys = userStore.selUserKeys

  const [deleteUserFn, { error}] = useMutation(
    DELETE_USER, 
    {
      update(cache, {data}) {
	try {
          if (data !== undefined) {
            const deleteUserData = data?.deleteUser.user
            const existUsers = cache.readQuery({
              query: FETCH_USERS,
            })
            const newUsers = existUsers?.users.filter(item => (
            	item.username !== deleteUserData.username))

            if (deleteUserData && existUsers) {
               cache.writeQuery({
                 query: FETCH_USERS,
                 data: {
	  	 users: [
	  	   ...newUsers
	           ]
                 }
               })
            }
          }
	} catch (error) {
          console.error('Failed to delete the user!')
	}
      }
    },
  )

  const selUserArr = []
  selectedUserKeys.forEach((element, i) => {
    selUserArr.push(
      <>
	<p>用户 {i+1}: <span className="d-list-item">{element}</span></p>
      </>
    )
  })

  const selUserArrLen = selUserArr.length
  let disable = true
  if (selUserArrLen !== 0) {
    disable = false
  } else {
    disable = true
  }

  const deleteConfirm = (e) => {
    e.preventDefault()
    const confirmBox = window.confirm(
      `请再次确认！删除后将不能恢复，你确定要删除当前这些用户吗?`
    )
    if (confirmBox === true) {
      handleDeleteUser()
    }
  }
  

  const handleDeleteUser = async () => {
    try {
      await setTimeout(() => {
        for (let user of selectedUserKeys) {
          deleteUserFn({variables: {
            username: user
	  }})
	}
      }, 100)
      await setTimeout(() => {
        closeModal()
	closeMore()
      }, 200)
    } catch (error) {
      console.error('Failed to delete the user')
    }
  }

  return (
    <React.StrictMode>
    <Styles>
      <section className="delete-container">
	<div className="delete-header">
	  <h3>你确定删除以下这些用户数据吗?</h3>
	</div>
	<div className="delete-list">
	  {selUserArrLen === 0 ? (
	    <div className="d-remark-warn">
	      <p>&#xf0a4; Hi, 伙计! 当前无数据，请选择至少一条进行删除操作!</p>
	    </div>
	  ) : (
	    <>
	      <h3>已选删除用户数据如下:</h3>
	      <div className="d-list-cont">
	        {selUserArr}
	      </div>
	    </>
	  )}
	</div>
      </section>
      <div className="delete-btn">
        <button 
	  onClick={deleteConfirm} 
	  disabled={disable}
	>
	  <p>删除</p>
	</button>
      </div>
      {error && <p>Error :( 请重试一遍!</p>}
    </Styles>
    </React.StrictMode>
  )
})

export default React.memo(DeleteUser)

const Styles = styled.section`
  .delete-container {
    width: 45rem;
    .delete-header {
      position: relative;
      top: -5px;
      margin: .3rem 2.5rem;
      h3 {
        font-size: 1.45rem;
	font-weight: 500;
	font-family: "Roboto","Arial",sans-serif;
	color: #fa2222;
	text-align: start;
      }
    }
    .delete-list {
      color: #005;
      background: #eceaeb;
      margin: .2rem 1.8rem .3rem 1.5rem;
      h3 {
        margin-bottom: .3rem;
	font-size: 1.2rem;
	text-decoration: underline;
      }
      .d-list-cont {
        max-height: 4.5rem;
        overflow: auto;
	padding: .5rem .1rem .5rem .7rem;
	p {
          color: #53535d;
	}
	p:before {
          //content: "- ";
	  font-family: 'FontAwesome';
          content: "\f00c";
	  font-weight: bold;
	  margin-left: .3rem;
	  color: #0e0edd;
	}
	.d-list-item {
          color: #fc0202;
	}
      }
      .d-remark-warn {
        color: red;
	padding: .5rem .1rem 1rem .3rem;  
	p:before {
          //content: "\f00c";
	}
      }                                   
    }                                     
  }                                       
  .delete-btn {                           
    margin: 1.3rem 0 .3rem 1.3rem;        
  }                                       
  .delete-btn{ 
    button {                 
      background-color: #0d10ce;            
      border: 1px solid #0d10ce;            
      border-radius: .3rem;                   
      margin-bottom: 0.9rem;                
      margin-right: 5px;                    
      //box-shadow: 0px 0px #fff !important;  
      p {
	font-size: 1.2rem;
	color: #eee !important;
	padding: .4rem .7rem;
	font-weight: 400;
      }
      &:hover {
        cursor: default;                      
        background-color: #0c0eaa;            
        border: 1px solid #0c0eaa;            
      }
    }
  }                                      
`                                         
                                          
                                          

