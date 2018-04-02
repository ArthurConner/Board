import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'


import { Header, List, Dropdown, Image, Grid } from 'semantic-ui-react'
import MessageCompose from './RequestView'

class MessageListView extends React.Component {


  render() {


    const {messages, isHost} = this.props

    const key = "mesage_list" + this.props.personid
    return (


      <div key = {key}>
    
    <Header  as='h4' >Messages</Header>
    <MessageCompose personid={this.props.personid}/>

    <List>
         
     { messages.map((message) => {

        let myM = ""


        if (message.from){
          const link = 'http://localhost:3001/users/' + message.from + '/image'

          myM = (<Image avatar src={link}  />)
        }

        return (
          <List.Item key ={message} >
          {myM}
         <List.Content>
          
           <List.Description>{message.message}
           </List.Description>
           </List.Content>

    
     
     
     </List.Item>
        )

      })
      }

      </List> 


        </div>
    )
  }

}


function mapStateToProps({people, messages, founder} ,ownProps) {
  //console.log("this is our post id",posts)
  const ckeys = Object.keys(people)

  if ((ckeys.length < 1) || !(ownProps.personid)) {
    // console.log("do not have a postid")
    // console.log(posts)
    return {
      person: {},
      messages: [],
      isHost: false
    }
  }

  const isHost = (founder === ownProps.personid)




  const you = people[ownProps.personid]
  console.log("we are the host", isHost, ownProps.personid, founder)
  const propM = messages.filter((message) => {
    if ((message.to === ownProps.personid) || (message.from === ownProps.personid)) {
      return true
    }

    if ((isHost) && (message.isAdmin)) {
      return true
    }

    return false

  })

  return {
    person: you,
    messages: propM,
    isHost
  }


}


/*
function mapDispatchToProps(dispatch) {

  return {
    fetchPost: (data) => dispatch(fetchPost(data))
  }
}
*/



export default connect(
  mapStateToProps, null
)(MessageListView)