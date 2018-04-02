import React from 'react'
import '../styles/semantic.min.css'

import { Link } from 'react-router-dom'

import { Menu, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { wantProject } from '../actions'
import MessageListView from './PersonMessageView'

class MenuView extends React.Component {

  innerStatus = ()=>{

    console.log("back here in inner status")

    let {ourProjects,
      ourBoard} = this.props
    
    
   
    if ((ourBoard.length > 0)&&(ourProjects.length > 0)){

      

      const member = ourBoard[Math.floor(Math.random()*ourBoard.length)];
      const idea = ourProjects[Math.floor(Math.random()*ourProjects.length)];

      
      const already = idea.wantedBy.filter((x)=>{return x === member.id})
      
      console.log("checking",member,idea,already)
      if (already.length < 1) {

        console.log("we have ",member.id,"should not be in", idea.wantedBy ,already)
        this.props.wantProject({personid:member.id,project:idea})
        console.log("would add project " + idea.request)
      } else {
        console.log("did the job")
      }
    } else {
      console.log("Nothing to do")
    }
    
    //this.checkStatus()
  }

  checkStatus = () => {
    console.log("will check status")
    setTimeout(this.innerStatus, 30090)


  }

  render() {

    this.checkStatus()

    
    return (
      <div>
   
        <Menu  style = {{
        backgroundColor: "#772ba1"
      }} >
           
        <Menu.Item as= {Link}  style = {{
        color: "white"
      }} to="/" >
          Home
        </Menu.Item>

 

       <Menu.Item as= {Link}  to="/messages"  style = {{
        color: "white"
      }} >
          Messages
        </Menu.Item>

      </Menu>

       
      
      </div>
    )
  }

}



function mapStateToProps({people, founder,  boardStatus,projects}) {

  if (!(projects)){
    return 
     {  
      boardStatus:[]
      projects:[]
    }

  }



  const keys = Object.keys(projects)
  const ourProjects = keys.map((key) => {
    return projects[key]
  }).filter((x)=>{ return !(x.done)})

  const boardKeys =  Object.keys(boardStatus)
  const ourBoard = boardKeys.map((key) => {
    return people[key]
  })

  return {
    ourProjects,
    ourBoard
  }


}

function mapDispatchToProps(dispatch) {

  return {
    wantProject: (data) => dispatch(wantProject(data))
  }
}



export default connect(
  mapStateToProps, mapDispatchToProps
)(MenuView)