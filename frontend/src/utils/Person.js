

import React from 'react'
import {  List ,ListIcon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function birthday(person){

    if (!(person) || !(person.birth)){
        return ""
    }

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    return "Born on " + months[person.birth.month -1] + " " + person.birth.day +", " + person.birth.year 

}

export function genderPronoun(person){

    if (person.gender === "M"){
        return "He"
    } else {
        return "She"
    }
}

export function friendsOf({person,people}) {

const keys = Object.keys(person.friends)

let mainPosts = keys.map((key) => {
  return people[key]
})

return mainPosts

}

export function linkOfPerson({person,founder,people,boardStatus}){

    const details = '/user/'  + person.id

    let thes = {color:'#772ba1'}
    if  (person.id in boardStatus) {
        thes.color = '#bd6732'
    }

    switch (statusOfPerson({person,founder,people,boardStatus})){
        case 1:

        return (
            <List.Header   ><Link style to={details} style={{color:'black'}}>{person.name}<List.Icon name='smile' /></Link></List.Header>
            )
        break
        case 2:
        return (
            <List.Header   ><Link style to={details} style={{color:'#bd6732'}}>{person.name}<List.Icon name='smile' /></Link></List.Header>
            )
        break
        case 3:
        return (
            <List.Header   ><Link style to={details} style={{color:'#772ba1'}}>{person.name}</Link></List.Header>
            )
        case 4:
        return (
            <List.Header   ><Link style to={details} style={{color:'2fa22b1'}}>{person.name}</Link></List.Header>
            )




    }

    
    

}

export function statusOfPerson({person,founder,people,boardStatus}){


    const details = '/user/'  + person.id
    if (!(person)){
        return 0
    }

    if (person.id === founder){
        return 1
    }

    if  (person.id in boardStatus) {
        return 2
    }

    const host = people[founder]

    if (person.id in host.friends) {
        return 3
    }
   
    return 4

}



