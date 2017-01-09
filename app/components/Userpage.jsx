import React from 'react'
import { connect } from 'react-redux'

// user info: name, email
// order history
   // order details: status, items (qty, subtotal), links to products, date/time of order

const mapStateToProps = (state) => {
   return { user: state.user.selectedUser }
}

export class Userpage extends React.Component {

constructor(props) {
   super(props)
}

render() {
   console.log('props: ', this.props)
   return(
          <div>
            <div>{this.props.user.name}</div>
            <div>{this.props.user.email}</div>
          </div>
          )
}

}

export default connect(mapStateToProps)(Userpage)
