import React, {MouseEvent} from 'react'
import styled from 'styled-components' 
import CloseIcon from '@mui/icons-material/Close';
import ManageDatabase from '../../manageDatabase'
import AccessLevelHOC from '../../../../hoc/accessLevelHOC'

type MoreAction = {
  isOpenMore: Boolean
}

class HeaderAction extends React.Component<{accessLevel}, MoreAction> {
  constructor(props) {
    super(props)
    this.state = {
      isOpenMore: false,
    }
    this.accessLevel = this.props.accessLevel
    this.onHandleOpenMore = this.onHandleOpenMore.bind(this)
    this.onHandleCloseMore = this.onHandleCloseMore.bind(this)
  }

  onHandleOpenMore(event: MouseEvent) {
    event.preventDefault()
    this.setState(
      {isOpenMore: true}
    )
  }

  onHandleCloseMore(event: MouseEvent) {
    event.preventDefault()
    this.setState({isOpenMore: false})
  }

  //componentDidMount() {
  //}

  render() {
    return (
      <React.Fragment>
        <Styles>
          {this.state.isOpenMore === false ? (
            <>
              {/*<CreateNewTableBox />*/}
	      <div 
                className="mysql-more-action" 
                onClick={this.onHandleOpenMore}
              >
                <p>更多操作...</p>
              </div>
            </>
          ) : (
            <>
              <div className="mysql-more-container">
                <div 
                  onClick={this.onHandleCloseMore}
                  className="mysql-close-action"
                >
                  <CloseIcon />
                </div>
                <ManageDatabase />
              </div>
            </>
          )}
	</Styles>
      </React.Fragment>
    )
  }

}

export default AccessLevelHOC(HeaderAction, 0)


const Styles = styled.section`
  display: flex;
  flex-direction: row;
  .header-more-action {
    color: #FFFFEB;
  }
`

