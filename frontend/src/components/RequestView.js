import React from 'react'
import '../styles/semantic.min.css'

import { Link } from 'react-router-dom'

import { List, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { helpProject } from '../actions'

class RequestView extends React.Component {


  askMe = (e, v) => {



    let project = v.value
    let {person} = this.props

    console.log("got here in requestview for project", project, "and person", person)
    this.props.helpProject({
      personid: person.id,
      project
    })
  }




  render() {


    let {projects} = this.props


    return (
      <Message>
   
   <Message.Header>
     Ask
    </Message.Header>
    Can you help with 

      <List>
      { projects.map((project) => {

        const key = "project_help" + project.key

        return (
          <List.Item key ={project} >
  
 <List.Content>
  
 
{project.request}?<Button circular floated='right' icon='thumbs outline up' onClick={this.askMe} value={project}/>


</List.Content>
</List.Item>
        )

      })
      }

       </List>
      
      </Message>
    )
  }

}



function mapStateToProps({people, founder, boardStatus, projects}) {

  if (!(projects)) {
    return {
      boardStatus: [],
      projects: []
    }

  }



  const keys = Object.keys(projects)
  const ourProjects = keys.map((key) => {
    return projects[key]
  }).filter((x) => {
    return !(x.done)
  })

  const boardKeys = Object.keys(boardStatus)
  const ourBoard = boardKeys.map((key) => {
    return people[key]
  })

  return {
    projects: ourProjects,

  }


}

function mapDispatchToProps(dispatch) {

  return {
    helpProject: (data) => dispatch(helpProject(data))
  }
}



export default connect(
  mapStateToProps, mapDispatchToProps
)(RequestView)