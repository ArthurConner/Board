import React from 'react'
import '../styles/semantic.min.css'
import { connect } from 'react-redux'
import { linkOfPerson } from '../utils/Person'

import { Button } from 'semantic-ui-react'
import { inviteMember } from '../actions'

class ConnectButton extends React.Component {



  askMe = () => {

    console.log("got here")

    let {buttonKey, buttonText, buttonAction} = this.props



    if (this.props.buttonAction === 1) {
      this.props.inviteMember({
        personid: this.props.personid
      })
    } else {
      this.props.showMessage()
    }
  }

  render() {

    let {buttonKey, buttonText} = this.props

    if (!(buttonKey)) {
      return ( <div></div>)
    }


    return (
      <Button key={buttonKey}

      onClick={this.askMe}


      >{buttonText}


        </Button>
    )
  }

}


function mapStateToProps({people, founder, boardStatus} ,ownProps) {
  //console.log("this is our post id",posts)

  if (!(founder)) {
    return {}
  }

  const you = people[founder]
  if (!(ownProps.personid in you.friends)) {
    return {}
  }


  const buttonKey = "Contact_button_" + ownProps.personid


  if (!(ownProps.personid in boardStatus)) {
    const buttonAction = 1

    return {
      buttonKey,
      buttonText: "Invite on Board",
      buttonAction
    }
  }


  const buttonAction = 2



  return {

    buttonKey,
    buttonText: "Messages",
    buttonAction
  }



}



function mapDispatchToProps(dispatch) {

  return {
    inviteMember: (data) => dispatch(inviteMember(data))
  }
}




export default connect(
  mapStateToProps, mapDispatchToProps
)(ConnectButton)