import React from 'react'

import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import MainView from './RootView.js'
import PersonView from './PersonView'

import { connect } from 'react-redux'
import { loadPeople } from '../actions'
import { withRouter } from 'react-router'
import { Grid } from 'semantic-ui-react'
import MessageListView from './PersonMessageView'

class BooksApp extends React.Component {


  // When the component mounts, we need to load out books from the AJAX call
  componentDidMount() {
    this.props.loadPeople()
  }



  render() {

    return (
      <div>

    <Switch>
    <Route exact path='/' render={() => (
        <MainView  />
      )}/>
      
        

       <Route exact path='/user/:id' render={({history, match}) => (
        <PersonView  personid={match.params.id} />
      )}/>

      <Route exact path='/messages' render={({history, match}) => (

        <Grid columns='equal' padded>
        <Grid.Column>
        <MessageListView />
          </Grid.Column>
          </Grid>
      )}/>

          </Switch>
        

        </div>
    )
  }

}


/*
   <Route exact path="/post/:id" render={({history, match}) => (
        <PostDetailView postid={match.params.id} />
      )}/>


      */



function mapStateToProps({founder}) {

  return {
    founder
  }

}



function mapDispatchToProps(dispatch) {
  return {
    loadPeople: (data) => dispatch(loadPeople(data))
  }
}



export default withRouter(connect(
  null, mapDispatchToProps
)(BooksApp))

