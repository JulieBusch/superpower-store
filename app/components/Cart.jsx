import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'
import { deleteProductFromOrder } from '../reducers/order'


/* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {

  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(e) {
    e.preventDefault()
    console.log(e.target.name)

    this.props.deleteItem({ id: this.props.order.id, product_id: e.target.name})
    // possibly render a quick 'deleted!' mesg
    //console.log('hey handleclick')
  }

  render() {


    var orderDivs = this.props.orderDetails.map((item) => {
      return (

        <div key={item.id}>

          <div className="nav-left">
            <div className="item-thumbnail"><img src={item.thumbnail} /></div>
            <h4>{item.name}</h4>
          </div>

          <div className="nav-right">
            <h3>price: {item.price}</h3>
            <h3>quantity: {item.orderlines.quantity}</h3>
            <h3>subtotal: {item.orderlines.subtotal}</h3>

            <img src={'/70287.png'} name={item.id} onClick={this.handleClick} />

          </div>
        </div>
        )
    })

    return (
      <div className="container">
        <h1> Your Cart </h1>

            {!this.props.orderDetails.length && <div>Your shopping cart is empty!</div>}

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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (orderObj) => {
      dispatch(deleteProductFromOrder(orderObj))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
