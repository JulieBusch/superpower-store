import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import { receiveSingleProduct, clearSelectedProduct, clearSimilarProducts } from '../reducers/products'

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

  render() {
    var selectedProduct = this.props.selectedProduct
    console.log("TAAAAAAGS ",selectedProduct.tags)
    return(
      <div className="popUp">
        <div className="column-2">
          <Link to="#" onClick={this.handleCloseClick} >Close</Link>
          <img src={selectedProduct.image} />
        </div>
        <div className="column-2">
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <div className="column-2">
            <span>{selectedProduct.price}</span>
          </div>
          <div className="column-2">
            <button className="product-view-btns">Add to Cart</button>
            <Link to="/cart">
              <button className="product-view-btns">Review Cart</button>
            </Link>
          </div>
        </div>
        <div className="similar-items">
          {this.props.similarProducts.slice(0, 5).map((product) => {
            return (<div key={product.id} className="column-5 catalog-tile">
              <h4>{product.name}</h4>
              <div className="product-thumbnail">
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
    selectedProduct: state.products.selectedProduct
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
