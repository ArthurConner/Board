import { LOAD_PEOPLE } from '../actions'


const initialTestState = {



  people: {
      "090e0ac0-a230-4de3-8d9c-f40148ddee92":
      {"last":"Mclemore",
      "name":"Glenn G. Mclemore",
      "gender":"M","imageID":34,
      "middle":"Gustavo",
      "birth":"1969-07-31",
      "id":"090e0ac0-a230-4de3-8d9c-f40148ddee92"
      ,"first":"Glenn"
    },
    "542e807e-c222-4d51-ad65-808260c39536":
    {"last":"Smith",
    "name":"Helena V. Smith",
    "gender":"F",
    "imageID":12,
    "middle":"Valeria",
    "birth":"1965-04-19",
    "id":"542e807e-c222-4d51-ad65-808260c39536",
    "first":"Helena"
    },
    "c29fdfeb-96c7-4a37-9afb-0a0a3d30cb00":
    {"last":"Kelly",
    "name":"Edward C. Kelly",
    "gender":"M",
    "imageID":0,
    "middle":"Calvin",
    "birth":"1960-01-09",
    "id":"c29fdfeb-96c7-4a37-9afb-0a0a3d30cb00",
    "first":"Edward"},
    "8a7aa4a9-4372-47e7-9c32-cfa36e4b9e33":
    {"last":"Villanueva",
    "name":"Brett E. Villanueva",
    "gender":"M",
    "imageID":46,
    "middle":"Eric",
    "birth":"1982-12-16",
    "id":"8a7aa4a9-4372-47e7-9c32-cfa36e4b9e33",
    "first":"Brett"
},
"2034a5e3-2c0e-4111-ad20-7e4873d8924d":
{"last":"Fish","name":"Beth J. Fish","gender":"F","imageID":35,
"middle":"Julie","birth":"1965-10-15","id":"2034a5e3-2c0e-4111-ad20-7e4873d8924d"
,"first":"Beth"},
"350c0da7-2807-40e1-ac04-8a7c78a10e4b":{"last":"Villarreal",
"name":"Richard S. Villarreal","gender":"M",
"imageID":38,"middle":"Shannon","birth":"1961-09-09",
"id":"350c0da7-2807-40e1-ac04-8a7c78a10e4b","first":"Richard"},
"5d8d779c-7b83-4b28-b68a-550c7f38e06d":
{"last":"Botelho","name":"Sherry M. Botelho",
"gender":"F","imageID":22,"middle":"Marilyn",
"birth":"1974-04-25","id":"5d8d779c-7b83-4b28-b68a-550c7f38e06d"
,"first":"Sherry"},
"0b719136-2a6a-45b7-b5a6-80e60b46fa0f":{"last":"Warren","name":"Andrew D. Warren",
"gender":"M","imageID":10,"middle":"David","birth":"1966-12-01",
"id":"0b719136-2a6a-45b7-b5a6-80e60b46fa0f","first":"Andrew"},
"c37c8256-efd6-4aa2-a8f8-36572ef90a47":{"last":"Davis","name":"Stanton S. Davis",
"gender":"M","imageID":29,"middle":"Sam","birth":"1968-03-28",
"id":"c37c8256-efd6-4aa2-a8f8-36572ef90a47","first":"Stanton"}
}
}

const initialRedState   = {



    people: {
       
  },
    companies:{

    },
    founder:"",
    properties:""
  }







function reditReducer(state = initialRedState, action) {

  switch (action.type) {
    case LOAD_PEOPLE:
      const {people,companies,founder,properties} = action

     

      return {
        ...state,
        people,companies,founder,properties
      }



    default:
      return state
  }
}




export default reditReducer