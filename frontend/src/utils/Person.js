

import React from 'react'
import {  List } from 'semantic-ui-react'
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

export function linkOfPerson({person,boardStatus}){

    const details = '/user/'  + person.id

    let thes = {color:'#772ba1'}
    if  (person.id in boardStatus) {
        thes.color = '#bd6732'
    }

    return (
    <List.Header   ><Link style to={details} style={thes}>{person.name}</Link></List.Header>
    )

}



