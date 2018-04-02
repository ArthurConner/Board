import { LOAD_PEOPLE, INVITE_MEMBER, WANT_PROJECT, HELP_PROJECT, ADD_FRIEND, SEND_MESSAGE } from '../actions'


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
  projects: {

    "newBuilding": {
      key: "newBuilding",
      request: "better gift shop",
      needs: {
        funds: 100
      },
      done: false,
      wantedBy: []

    },
    "useful": {
      key: "useful",
      request: "us to help more children",
      needs: {

        funds: 100,
        marketing: 1

      },
      done: false,
      wantedBy: []

    },
    "enviormental": {
      key: "enviormental",
      request: "be more green",
      needs: {
        marketing: 1
      },
      done: false,
      wantedBy: []

    },
    "reporting": {
      key: "reporting",
      request: "more reports for our tax filing.",
      needs: {
        accounting: 1
      },
      done: false,
      wantedBy: []

    }



  }

}







function reditReducer(state = initialRedState, action) {

  const {people, companies, founder, properties, personid, project} = action

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

      return {
        ...state,
        boardStatus: m
      }
      break

    case WANT_PROJECT:


      let projects = {
        ...state.projects
      }

      projects[project.key] = {
        ...project
      }
      projects[project.key].wantedBy.push(personid)

      return {
        ...state,
        projects
      }

      break

    case HELP_PROJECT:


      let hprojects = {
        ...state.projects
      }

      hprojects[project.key] = {
        ...project
      }
      hprojects[project.key].done = true

      return {
        ...state,
        projects: hprojects
      }

      break

    case ADD_FRIEND:

      let nextPep = {
        ...state.people
      }
      let f = nextPep[state.founder]
      console.log("prior friends", nextPep[state.founder].friends)
      if (personid in f.friends) {
        f.friends[personid] = f.friends[personid] + 1
      } else {
        f.friends[personid] = 1
      }
      console.log("adding a friend", personid, nextPep[state.founder].friends)
      return {
        ...state,
        people: nextPep
      }

      break

    case SEND_MESSAGE:
      const {isFromHost, isAdmin, message} = action

      let aMess = {
        isAdmin: false,
        from: personid,
        to: state.founder,
        time: Date(),
        message: message
      }


      if (isFromHost) {
        aMess.to = personid
        aMess.from = state.founder
      }


      let nextM = [...state.messages, aMess]
      return {
        ...state,

        messages: nextM
      }

    default:
      return state
  }
}




export default reditReducer