
import axios from 'axios'
export const LOAD_PEOPLE = 'LOAD_PEOPLE'

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

        const  {people,companies,founder,properties} = response.data
       
        const action = {
          type: LOAD_PEOPLE,
          people ,companies,founder,properties
        }

        dispatch(action)

      })
      .catch(function(error) {
        console.log("we have a loadServer error")
        console.log(error);
      });

  }

}





