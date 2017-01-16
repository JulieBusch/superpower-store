import React, { Component } from 'react'
import {connect} from 'react-redux'
import Splash from './Splash'
import SingleProduct from './SingleProduct'

import {receiveSingleProduct, receiveSimilarProducts} from '../reducers/products'

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    similarProducts: state.products.similarProducts,
    selectedProduct: state.products.selectedProduct
  }
}


export class Products extends Component {

  constructor(props) {
    super(props)
  }

  handleClick(productId) {
    receiveSingleProduct(productId);
    receiveSimilarProducts(productId);
  }

  render() {

    var productDivs = this.props.products.map((product) => {
          return(
            <div key={product.id} className="column-3 catalog-tile">
              <h4>{product.name}</h4>
              <div className="product-thumbnail">
                <a onClick={this.handleClick.bind(this, product.id)}>
                  <img src={product.thumbnail} />
                </a>
              </div>
            </div>
          )
      });

    return(
      <div>
        <Splash />
  	    <div className="container catalog">
          {this.props.selectedProduct.id && <SingleProduct />}
  		    {productDivs}
  	    </div>
      </div>
		)
	}
}


export default connect(mapStateToProps)(Products)
