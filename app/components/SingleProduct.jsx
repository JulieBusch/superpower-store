import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import { receiveSingleProduct, clearSelectedProduct, clearSimilarProducts } from '../reducers/products'
import { updateOrder, addNewOrder } from '../reducers/order'

/*-----------------COMPONENT------------------*/

export class SingleProduct extends React.Component {

  constructor(props) {
    super(props)

    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleCloseClick() {
    this.props.clearDetailView()
  }

  handleNewItemClick(productId) {
    this.props.setNewSelectedProduct(productId)
  }

  handleAddItemToCart(productId) {
    if (!this.props.selectedOrder.id) {
      console.log('productid ', productId)
       this.props.addNewOrder(productId)
      // .then( () => {
      //    this.props.updateOrder({ orderId: this.props.selectedOrder.id, productId: productId })
      // })
    }
    else {
    this.props.updateOrder({ orderId: this.props.selectedOrder.id, productId: productId })
    }
  }

  render() {
    var selectedProduct = this.props.selectedProduct
    return (
      <div className="popUp">
        <div className="row">

          <div className="column-2">
            <Link to="#" onClick={this.handleCloseClick} >Close</Link>
            <img src={selectedProduct.image} />
          </div>

          <div className="column-2">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>

            <div className="row">
              <div className="column-2">
                <span>{selectedProduct.price}</span>
              </div>
              <div className="column-2">
                <button className="product-view-btns" onClick={this.handleAddItemToCart.bind(this, selectedProduct.id)}>Add to Cart</button>
                <Link to="/cart">
                  <button className="product-view-btns">Review Cart</button>
                </Link>
              </div>
            </div>

          </div>

        </div>

        <div className="similar-items column-2">
          {this.props.similarProducts.slice(0, 5).map((product) => {
            return (<div key={product.id} className="column-5 similar-tile">
              <h4>{product.name}</h4>
              <div className="similar-thumbnail">
                <Link to='#' onClick={this.handleNewItemClick.bind(this, product.id)}>
                  <img src={product.thumbnail} />
                </Link>
              </div>
            </div>)
          })}
        </div>
      </div>
    )

  }



}

/*-----------------CONTAINER------------------*/

function mapStateToProps(state) {
  return {
    similarProducts: state.products.similarProducts,
    selectedProduct: state.products.selectedProduct,
    selectedOrder: state.orders.selectedOrder,
    selectedOrderDetails: state.orders.selectedOrderDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearDetailView: () => {
      dispatch(clearSelectedProduct())
      dispatch(clearSimilarProducts())
    },
    setNewSelectedProduct: (productId) => {
      dispatch(receiveSingleProduct(productId))
    },
    addNewOrder: (productId) => {
      dispatch(addNewOrder(productId))
    },
    updateOrder: (orderObj) => {
      dispatch(updateOrder(orderObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
