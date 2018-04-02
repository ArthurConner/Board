import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'
import { birthday, genderPronoun, friendsOf, linkOfPerson, statusOfPerson } from '../utils/Person'

import { Header, List, Dropdown, Image, Grid, Button,Icon, Item } from 'semantic-ui-react'


import  {inviteFriend} from '../actions'



class FriendView extends React.Component{


    clickNext = ()=>{
        this.props.inviteFriend({personid:this.props.person.id,alreayid:this.props.hostid})
    }

    render (){


        const {person,founder,boardStatus,people,hostid} = this.props


        const link = 'http://localhost:3001/users/' + person.id + '/image'


        const personDet = linkOfPerson({
          person,
          boardStatus,
          founder, people
        })

        const persState = statusOfPerson({person:person,founder:this.props.founder,people:this.props.people,boardStatus:this.props.boardStatus})

        let additional = ""
        let nextB = ""

        if (persState === 2){
          additional = "On your board"
        }

        if (persState === 3){
          additional =(<List.Content>Mutal Friend</List.Content>)
        }

        if ((persState === 4) && (this.props.status < 3)){
          additional = ""

          
          nextB = (
            <Item.Extra><Button basic floated='right' color='violet' size = 'tiny' onClick ={this.clickNext}><Icon name='heart'/> Introduce</Button></Item.Extra>
          )
        }

       console.log("with FriendList Item",)

      const key = person.id + "Friend with " + hostid

      return (
        <List.Item key={key}>
        <Image avatar src={link}  />
        
        <List.Content>
          {personDet}<p> {additional}</p>
          </List.Content>

          {nextB}
          
    </List.Item>
      )
    }

      

}




function mapStateToProps({people, founder, companies, boardStatus} ,ownProps) {

    return {
        people, founder, companies, boardStatus
    }
  
  }
  
  
  
  function mapDispatchToProps(dispatch) {
  
    return {
      inviteFriend: (data) => dispatch(inviteFriend(data))
    }
  }
  
  
  
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(FriendView)

  /*
   const link = 'http://localhost:3001/users/' + person.id + '/image'


        const personDet = linkOfPerson({
          person,
          boardStatus,
          founder, people
        })

        const persState = statusOfPerson({person:person,founder:this.props.founder,people:this.props.people,boardStatus:this.props.boardStatus})

        let additional = ""
        let nextB = ""

        if (persState === 2){
          additional = "On your board"
        }

        if (persState === 3){
          additional =(<List.Content>Mutal Friend</List.Content>)
        }

        if ((persState === 4) && (this.props.status < 3)){
          additional = ""

          
          nextB = (
            <Button onClick ={() =>{this.props.}
          
        } else if (persState === 4){
          additional = "Have a board member make an introduction."
        }

        console.log("we are at for person status",persState,this.props.status,additional)
        return (
          <List.Item key={person.id}>
               <Image avatar src={link}  />
               <List.Content>
                 {personDet}<p> {additional}</p>
                 </List.Content>
                 
                
           </List.Item>
        )
        */