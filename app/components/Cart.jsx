import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'
import { deleteProductFromOrder } from '../reducers/order'


/* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {

  constructor(props){
    super(props)
    // this.state = {
    //   clicked: false
    // }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(e) {
    e.preventDefault()
    const productId = e.target.name

    // this.setState({  clicked : true  })

    // setTimeOut(() => this.setState({  clicked : false  }), 2000)

    this.props.deleteItem({ orderId: this.props.order.id, productId: e.target.name})
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
            <div className="item-thumbnail"><img className="cart-thumbnail" src={`./thumbnails/${item.thumbnail}`} /></div>
            <h4>{item.name}</h4>
          </div>

          <div className="cart-column-2">
            <h4>price: {convertNum(item.price)}</h4>
            <h4>quantity: {item.orderlines.quantity}</h4>
            <h4>subtotal: {convertNum(item.orderlines.subtotal + ".00")}</h4>
          </div>

          <div className="cart-column-delete">
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

        {
          // this.state.clicked &&
          // <div id="delete_conf">Item deleted!
          // </div>
        }

        <div className="cart-total-column">
          <div className="total">
            <h3>Total: {this.props.order.total}</h3>
          </div>
          <div className="total">
            <Link to="/checkout">
            <button type="submit" id="checkout-btn">Checkout</button>
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
