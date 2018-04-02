
import axios from 'axios'
export const LOAD_PEOPLE = 'LOAD_PEOPLE'
export const INVITE_MEMBER = 'INVITE_MEMBER'
export const WANT_PROJECT = 'WANT_PROJECT'
export const HELP_PROJECT = 'HELP_PROJECT'
export const ADD_FRIEND = 'ADD_FRIEND'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}


export function loadPeople() {


  return (dispatch) => {

    const postsurl = {
      method: 'get',
      url: `${api}/users`,
      headers: {
        ...headers,
      }
    }



    axios(postsurl)
      .then(function(response) {

        const {people, companies, founder, properties} = response.data

        const action = {
          type: LOAD_PEOPLE,
          people,
          companies,
          founder,
          properties
        }

        dispatch(action)

      })
      .catch(function(error) {
        console.log("we have a loadServer error")
        console.log(error);
      });

  }

}


export function inviteMember({personid}) {

  return (dispatch) => {
    const iaction = {
      type: INVITE_MEMBER,
      personid
    }
    dispatch(iaction)


    dispatch({
      type: SEND_MESSAGE,
      isAdmin: false,
      isFromHost: false,
      personid,
      message: "I am excited to be on the board."
    })

  }


}


export function wantProject({personid, project}) {

  return (dispatch) => {
    dispatch({
      type: WANT_PROJECT,
      personid,
      project
    })

    dispatch({
      type: SEND_MESSAGE,
      isFromHost: false,
      personid,
      isAdmin: false,
      message: "I want " + project.request
    })

  }

}

export function helpProject({personid, project}) {

  return (dispatch) => {
    dispatch({
      type: HELP_PROJECT,
      personid,
      project
    })

    dispatch({
      type: SEND_MESSAGE,
      isFromHost: false,
      personid,
      isAdmin: false,
      message: "Glad to help with " + project.request
    })

  }

}


export function inviteFriend({personid, alreadyid, name}) {

  return (dispatch) => {
    const faction = {
      type: ADD_FRIEND,
      personid,
      alreadyid
    }

    dispatch(faction)
    dispatch({
      type: SEND_MESSAGE,
      isFromHost: false,
      personid: alreadyid,
      isAdmin: false,
      message: "Meet my friend " + name
    })


  }
}



export function sendMessage({isFromHost, personid, message}) {



  return {
    type: SEND_MESSAGE,
    isFromHost,
    personid,
    isAdmin: false,
    message
  }
}




