
import axios from 'axios'
export const LOAD_PEOPLE = 'LOAD_PEOPLE'
export const INVITE_MEMBER = 'INVITE_MEMBER'
export const WANT_PROJECT = 'WANT_PROJECT'
export const ADD_FRIEND = 'ADD_FRIEND'
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

  return {
    type: INVITE_MEMBER,
    personid
  }

}


export function wantProject({personid,project}) {

  return {
    type: WANT_PROJECT,
    personid,
    project

  }

}

export function inviteFriend({personid,alreadyid}){

  return {
    type:ADD_FRIEND,
    personid,
    alreadyid

  }


}




