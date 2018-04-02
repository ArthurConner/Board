import React from 'react'
import '../styles/semantic.min.css'

import { Link } from 'react-router-dom'

import { Menu, Segment ,Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { wantProject } from '../actions'

class RequestView extends React.Component {



  render() {


    
    return (
      <Message>
   
   <Message.Header>
      Ask a favor
    </Message.Header>

       <p>Introduce me to a friend </p>
       <p>Help me with </p>
       
      
      </Message>
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
)(RequestView)