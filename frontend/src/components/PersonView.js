import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'
import { birthday, genderPronoun, friendsOf, linkOfPerson, statusOfPerson } from '../utils/Person'

import { Header, List, Dropdown, Image, Grid, Button } from 'semantic-ui-react'
import MessageListView from './PersonMessageView'
import MainMenu from './MainMenu'
import ContactButton from './ContactButton'



import FriendListItem from './FriendListItem'




class PersonView extends React.Component {



  state = {
    hasMessage: false

  }
  showMessage = () => {


    this.setState({
      hasMessage: !(this.state.hasMessage)
    })
  }

  messageDetails() {

    if (this.state.hasMessage) {
      return (

        <Grid.Column>
    <MessageListView personid={this.props.personid}/>
    </Grid.Column>
      )
    }
    return ""
  }



  render() {

    let {person, workHistory, friends, sectors, job, boardStatus, founder, people} = this.props

    const link = 'http://localhost:3001/users/' + person.id + '/image'

    console.log(person.gender, person)


    let pronoun = genderPronoun(person)
    let birth = birthday(person)


    const makeCols = () => {

      if (this.state.showMessage) {
        return 2
      }
      return 1
    }

    let cols = makeCols()

    console.log("we have", cols, "columns")
    return (


      <div key = "postdetail_{key}">
      
      <MainMenu/>

    
    <div>
    <Image centered size='small' src={link}  circular />
    <Header as='h2' icon textAlign='center'>
     
      <Header.Content>
      {person.name}
      </Header.Content>
    </Header>

   

    <Header as='h4'  textAlign='center'>
  
      <Header.Content>
      {person.occupation}<br/>
      {job} <br/> {person.location}, CA * {friends.length} friends
      <br/><ContactButton personid ={person.id} showMessage={this.showMessage} />
      </Header.Content>
      <Header.Content>
      
      </Header.Content>
    </Header>

  </div>


<Grid columns='equal' padded>

<Grid.Column>

   
      <Header  as='h2' >About </Header>
      <p>{birth}, {person.first} has worked in the {sectors.toLowerCase()} sectors.</p>
    <p> {pronoun} is known to be {person.generosity} with what {pronoun.toLowerCase()} has, and has {person.wealth} to give.</p>
    
      <Header  as='h2' >Employment History</Header>
    <List>
         
     { workHistory.map((job) => {


        return (
          <List.Item key={job}>
        
         <List.Content>
          
           <List.Description>{job}
           </List.Description>
           </List.Content>

    
     
     
     </List.Item>
        )

      })
      }

      </List> 

<Header  as='h2' >Friends With:</Header>

            <List>
           
           { friends.map((person) => {

             return (
               <FriendListItem person={person} hostid={person.id} status={this.props.status}/>
             )
       

      
      })}
    

            </List> 
            </Grid.Column>
            { this.messageDetails() }
            </Grid>
          
        </div>
    )
  }

}


function mapStateToProps({people, founder, companies, boardStatus} ,ownProps) {
  //console.log("this is our post id",posts)
  const ckeys = Object.keys(people)

  if ((ckeys.length < 1) || !(ownProps.personid)) {
    // console.log("do not have a postid")
    // console.log(posts)
    return {
      person: {},
      workHistory: [],
      friends: [],
      sectors: "",
      job: "",
      founder:"",
      people:{},
      status:-1


    }
  }


  const you = people[ownProps.personid]
  let friends = friendsOf({
    person: you,
    people
  }).filter((x)=>{return x.id !== founder})


  const currentPos = you.employment[0]
  let i = 0

  while ((i < you.employment.length) && (currentPos === you.employment[i])) {
    i++
  }

  var mysectors = new Set();
  let workHistory = [(2018 - i) + "+ at " + companies[currentPos]["Name"]]

  const job = companies[currentPos]["Name"]
  mysectors.add(companies[currentPos]["Sector"])

  console.log("emphis", you.employment)

  let j = i
  while (j < you.employment.length) {

    let thenPos = you.employment[j]
    while ((j < you.employment.length) && (thenPos === you.employment[j])) {
      //console.log("comaring",thenPos,you.employment[j] )
      j++
    }

    workHistory.push((2018 - j) + " - " + (2018 - i) + " at " + companies[thenPos]["Name"])
    mysectors.add(companies[thenPos]["Sector"])

    i = j

  }

  const status = statusOfPerson({person:you,founder,people,boardStatus})

  return {

    person: you,
    workHistory,
    friends,
    sectors: Array.from(mysectors).join(", "),
    job,
    boardStatus,
   founder,people,
   status
  }





}


/*
function mapDispatchToProps(dispatch) {

  return {
    inviteFriend: (data) => dispatch(inviteFriend(data))
  }
}
*/




export default connect(
  mapStateToProps, null
)(PersonView)