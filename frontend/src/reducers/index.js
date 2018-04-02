import { LOAD_PEOPLE, INVITE_MEMBER , WANT_PROJECT,ADD_FRIEND} from '../actions'


const initialTestState = {



  people: {
    "090e0ac0-a230-4de3-8d9c-f40148ddee92": {
      "last": "Mclemore",
      "name": "Glenn G. Mclemore",
      "gender": "M",
      "imageID": 34,
      "middle": "Gustavo",
      "birth": "1969-07-31",
      "id": "090e0ac0-a230-4de3-8d9c-f40148ddee92",
      "first": "Glenn"
    },
    "542e807e-c222-4d51-ad65-808260c39536": {
      "last": "Smith",
      "name": "Helena V. Smith",
      "gender": "F",
      "imageID": 12,
      "middle": "Valeria",
      "birth": "1965-04-19",
      "id": "542e807e-c222-4d51-ad65-808260c39536",
      "first": "Helena"
    }
  }
}

const initialRedState = {



  people: {

  },
  companies: {

  },
  founder: "",
  properties: [],
  messages: [
    {
      isAdmin: true,
      from: "",
      to: "",
      time: Date(),
      message: "Welecome to Board Manager. To get started you might want to invite a few people on the board"
    }


  ],
  boardStatus: {},
  projects:{
    "moreMembers":{
      key:"moreMembers",
      request:"more board members",
      needs:{
          boardCount: 6
      },
      done:false,
      wantedBy:[]

    },
    "newBuilding":{
      key:"newBuilding",
      request:"better gift shop",
      needs:{
          funds:100
      },
      done:true,
      wantedBy:[]

    },
    "useful":{
      key:"useful",
      request:"us to help more children",
      needs:{
      
        funds:100,
        marketing:1

      },
      done:false,
      wantedBy:[]

    },
    "enviormental":{
      key:"enviormental",
      request:"be more green",
      needs:{
       marketing:1
      },
      done:true,
      wantedBy:[]

    },
    "reporting":{
      key:"reporting",
      request:"more reports for our tax filing.",
      needs:{
        accounting:1
      },
      done:true,
      wantedBy:[]

    }



  }

}







function reditReducer(state = initialRedState, action) {

  const {people, companies, founder, properties,personid,project} = action

  switch (action.type) {
    case LOAD_PEOPLE:
      



      return {
        ...state,
        people,
        companies,
        founder,
        properties
      }

      break
    case INVITE_MEMBER:

    
      let m = {
        ...state.boardStatus
      }
      m[personid] = {
        status: "On",
        boardSize: 6,
        happiness: 10
      }
      let nextM = [...state.messages, {
        isAdmin: false,
        from: personid,
        to: state.founder,
        time: Date(),
        message: "I am excited to be on the board."
      }
      ]
      return {
        ...state,
        boardStatus: m,
        messages:nextM
      }
      break

      case WANT_PROJECT: 


      let messages = [...state.messages, {
        isAdmin: false,
        from: personid,
        to: state.founder,
        time: Date(),
        message: "I want " + project.request
      }]

      let projects = {...state.projects}
    
      projects[project.key] = {...project}
      projects[project.key].wantedBy.push(personid)
      
      return   {
        ...state,
        projects,
        messages
      }

    break

    case ADD_FRIEND:

      let nextPep = {...state.people}
      let f = nextPep[state.founder]
      console.log("prior friends",nextPep[state.founder].friends)
      if (personid in f.friends){
        f.friends[personid] = f.friends[personid] + 1
      } else {
      f.friends[personid] = 1
      }
      console.log("adding a friend",personid,nextPep[state.founder].friends)
      return {
        ...state,
        people:nextPep
      }

      break

    default:
      return state
  }
}




export default reditReducer