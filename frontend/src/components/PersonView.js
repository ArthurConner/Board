import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'


import { Header, List, Dropdown ,Image} from 'semantic-ui-react'


class PersonView extends React.Component {



        

  render() {

    let {person,workHistory,friends,sectors} = this.props

    const link = 'http://localhost:3001/users/' +person.id +'/image'

    console.log(person.gender,person)

    const makeGender = ()=> {

        if (person.gender === "M"){
            return "He"
        } else {
            return "She"
        }
    }
    
    let pronoun  = makeGender()

    
    const makeBday = ()=>{
        if (!(person) || !(person.birth)){
            return ""
        }

        return "Born " + person.birth.month +", " + person.birth.year 

    }
    
    let birth = makeBday()

    return (


      <div key = "postdetail_{key}">
      

        <div>
    <Header as='h2' icon textAlign='center'>
     
      <Header.Content>
      {person.name}
      </Header.Content>
    </Header>
    <Image centered size='medium' src={link}  circular />
  </div>

      
      <Header  as='h2' >Bio</Header>
      <p>{birth}</p>
     {person.first} has worked in the {sectors.toLowerCase()} sectors in the {person.occupation} department.
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

            <List horizontal>
           
           { friends.map((person) => {
             const link = 'http://localhost:3001/users/' +person.id +'/image'
             const details = '/user/'  + person.id
    

             return (
               <List.Item key={person.id}>
               <Image avatar src={link}  />
               <List.Content>
                 <List.Header as='a' href={details}>{person.name}</List.Header>
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


function mapStateToProps({people,founder,companies} ,ownProps) {
  //console.log("this is our post id",posts)
  const ckeys = Object.keys(people)

  if ((ckeys.length <1) || !(ownProps.personid)) {
    // console.log("do not have a postid")
    // console.log(posts)
    return {
      person: {},
      workHistory: [],
      friends:[],
      sectors:""
     

    }
  }




    const you = people[ownProps.personid]
    const keys = Object.keys(you.friends)

    let mainPosts = keys.map((key) => {
      return people[key]
    })

   

    const currentPos = you.employment[0]
    let i = 0

    while ((i < you.employment.length) &&  ( currentPos === you.employment[i])){
        i++ 
    }

    var mysectors = new Set();
    let workHistory = [(2018-i) +"+ at " + companies[currentPos]["Name"] ]

    mysectors.add(companies[currentPos]["Sector"])

    console.log("emphis",you.employment)
    
    let j = i
    while (j < you.employment.length){

        let thenPos =  you.employment[j]

        while ((j < you.employment.length) &&  ( thenPos === you.employment[j])){
            //console.log("comaring",thenPos,you.employment[j] )
            j++
        }

        workHistory.push( (2018-j) + " - " + (2018-i) + " at " + companies[thenPos]["Name"] )
        mysectors.add(companies[thenPos]["Sector"])

        i = j

    } 
    

    return {
     
      person: you,
      workHistory,
      friends:mainPosts,
      sectors:Array.from(mysectors).join(", ")

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
)(PersonView)