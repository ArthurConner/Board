import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'


import { Header, List, Dropdown, Image, Grid } from 'semantic-ui-react'

import sortBy from 'sort-by'
import { pseudoRandomBytes } from 'crypto';

import { linkOfPerson } from '../utils/Person'

import MainMenu from './MainMenu'
import MessageListView from './PersonMessageView'

class RootView extends React.Component {

  state = {
    orderBy: "timestamp"
  }



  shiftItem = (event) => {
    const orderBy = event.target.value
    const ret = {
      orderBy
    }

    console.log("changing order", ret)
    this.setState(ret)
  }

  render() {


    let {people, companies, you, boardStatus} = this.props

    if (!(people)) {
      console.log("no body")
      people = []
    } else {
      console.log("found people", people)
    }

    const bar = people.map((x) => {
      console.log("name is ", x.name)
      return x.name
    })
    console.log(bar)
    return (
      <div key="home">
      
      <MainMenu/>
     
      <div style = {{
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        backgroundColor: "white"
      }}>
     
     <Grid columns='equal' padded>

<Grid.Column>
     <Header>{you.name}'s Network</Header>
    
      <List>
           
       { people.map((person) => {
        const link = 'http://localhost:3001/users/' + person.id + '/image'
        const details = '/user/' + person.id

        const da = Date.parse(person.birth)
        //console.log("we are at",da)
        //const birthDay = da.toLocaleDateString("en-US")
        //src={link} size='mini' bordered='true' circular />

        var company = companies[person["employment"][0]]
        var cName = company["Name"] + " (" + company["Sector"] + ")"

        var age = 2017 - person.birth.year

        var pLink = linkOfPerson({
          person,
          boardStatus
        })

        return (
          <List.Item key={person.id}>
           <Image avatar src={link}  />
           <List.Content>
             {pLink}
             <List.Description>Works in {person.occupation} at {cName}, Age:{age}.
             </List.Description>
             </List.Content>

      
       
       
       </List.Item>
        )

      })
      }

        </List> 

        </Grid.Column>
        <Grid.Column>
        <MessageListView personid={you.id}/>
        <Header  as='h4' >Board Status</Header>
        <Header  as='h4' >To Do's</Header>
        <Header  as='h4' >Completed Projects</Header>
          </Grid.Column>
          </Grid>
        </div>
        </div>
    )
  }

}


function mapStateToProps({people, founder, companies, boardStatus} ,ownProps) {


  const keys = Object.keys(people)





  if (keys.length > 0) {

    console.log("this is the host", founder)

    const you = people[founder]
    const keys = Object.keys(you.friends)
    let mainPosts = keys.map((key) => {
      return people[key]
    })

    return {

      "people": mainPosts,
      companies,
      you,
      boardStatus
    }
  }

  return {

    "people": [],
    "companies": [],
    you: {},
    boardStatus
  }




}

/*
function mapDispatchToProps (dispatch) {
    return {
      loadBookShelf: (data) => dispatch(loadBookShelf(data))
    }
  }
  */



export default connect(
  mapStateToProps, null
)(RootView)