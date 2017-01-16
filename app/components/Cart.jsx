import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'


/* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {

  constructor(props){
    super(props)

    // this.orderDivs = this.orderDivs.bind(this)

  }

  handleClick(item){
    // possibly render a quick 'deleted!' mesg
    console.log(item)
    // this.props.ACTIONCREATOR()
  }

  render() {


    var orderDivs = this.props.orderDetails.map(function(item){
      return (

        <div key={item.id}>
        <h1>CART!</h1>
          <div className="nav-left">
            <div className="item-thumbnail"><img src={item.thumbnail} /></div>
            <h4>{item.name}</h4>
          </div>

          <div className="nav-right">
            <h3>{item.price}</h3>
            <img src={'/70287.png'} onClick={this.handleClick.bind(this, item)}/>
          </div>
        </div>
        )
    })

    return (
      <div className="container">
        <h1> Your Cart </h1>

            {!this.props.selectedUser.length && <div>Your shopping cart is empty!</div>}

        {orderDivs}
        <div>
          Total: {this.props.order.total}
        </div>
        <div>
          <Link to="/checkout">
          Checkout
          </Link>
        </div>


      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */


const mapStateToProps = (state) => {
  return ({
    selectedUser: state.user.selectedUser,
    order: state.orders.selectedOrder,
    orderDetails: state.orders.selectedOrderDetails

  })
}

const mapDispatchToProps = () => {

  return ({})
  // return

  // function that deletes an item from the order
  // function that subtotals the order(??)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
