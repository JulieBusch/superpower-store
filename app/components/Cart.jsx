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

    this.props.deleteItem({ orderId: this.props.order.id, productId: e.target.name})
    // possibly render a quick 'deleted!' mesg
    //console.log('hey handleclick')
  }

  render() {

    const convertNum = (str) => {
      let newStr = str.slice(str.length-6);
      str = str.slice(0, str.length-6);
      let count = 0;
      for(var i=str.length; i>=0; i-- ){
        newStr = str.charAt(i) + newStr;
        if(count%3===0 && i>0) newStr = ',' + newStr;
        count++;
      }
      return newStr;
    }


    var orderDivs = this.props.orderDetails.map((item) => {
      return (

        <div key={item.id} className="row">

          <div className="cart-column-4">
            <div className="item-thumbnail"><img className="cart-thumbnail" src={item.thumbnail} /></div>
            <h4>{item.name}</h4>
          </div>

          <div className="cart-column-2">
            <h3>price: {convertNum(item.price)}</h3>
            <h3>quantity: {item.orderlines.quantity}</h3>
            <h3>subtotal: {convertNum(item.orderlines.subtotal + ".00")}</h3>
          </div>

          <div className="cart-column-4">
            <img className="delete-cart-item" src={'/70287.png'} name={item.id} onClick={this.handleClick} />
          </div>
        </div>
        )
    })

    return (
      <div className="container cart">
        <h1> Your Cart </h1>

            {!this.props.orderDetails.length && <div>Your shopping cart is empty!</div>}

        {orderDivs}
        <div className="cart-total-column">
          <div className="total">
            Total: {this.props.order.total}
          </div>
          <div className="total">
            <Link to="/checkout">
            Checkout
            </Link>
          </div>
        </div>
        <div></div>

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
