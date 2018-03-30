import React from 'react'
import '../styles/semantic.min.css'

import { Link } from 'react-router-dom'

import { Menu, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { wantProject } from '../actions'

class MenuView extends React.Component {

  innerStatus = ()=>{

    //console.log("back here", this)

    let {ourProjects,
      ourBoard} = this.props
    
    
   
    if ((ourBoard.length > 0)&&(ourProjects.length > 0)){

      

      const member = ourBoard[Math.floor(Math.random()*ourBoard.length)];
      const idea = ourProjects[Math.floor(Math.random()*ourProjects.length)];

      
      const already = idea.wantedBy.filter((x)=>{x == member.id})
      
      if (already.length < 1) {

        console.log("we have ",member,idea,ourBoard,already)
        this.props.wantProject({personid:member.id,project:idea})
        console.log("would add project " + idea.request)
      }
    } else {
      console.log("Nothing to do")
    }
    
    //this.checkStatus()
  }

  checkStatus = () => {
    console.log("will check status")
    setTimeout(this.innerStatus, 30000)


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

 

       <Menu.Item as= {Link}  to="/new/post"  style = {{
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