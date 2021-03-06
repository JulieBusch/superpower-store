import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Splash from './Splash'
import SingleProduct from './SingleProduct'

import {
  receiveSingleProduct,
  receiveSimilarProducts,
  receiveProductReviews
} from '../reducers/products'


export class Products extends Component {

  constructor(props) {
    super(props)
    this.nameParser = this.nameParser.bind(this)
  }

  handleClick(productId) {
    console.log('product id: ', productId)
    this.props.selectProduct(productId)
  }

  nameParser(name) {
    var nameArr = name.toLowerCase().split('');
    for(var i = 0; i < nameArr.length; i++) {
      if(nameArr[i] === ' ') {
        nameArr[i] = '-'
      }
    }
    return nameArr.join('');
  }

  render() {

    var productDivs = this.props.products.map((product) => {

      return (
        <div key={product.id} className="column-3 catalog-tile">
          <h4>{product.name}</h4>
          <div className={`product-thumbnail ${this.nameParser(product.name)}`}>
            <Link to='#' onClick={this.handleClick.bind(this, product.id)}>
              <img src={`./thumbnails/${product.thumbnail}`} />
            </Link>
          </div>
        </div>
      )
    })


    return (
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


const mapStateToProps = state => {
  return {
    products: state.products.products,
    similarProducts: state.products.similarProducts,
    selectedProduct: state.products.selectedProduct,
    selectedProductReviews: state.products.selectedProductReviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectProduct: (productId) => {
      dispatch(receiveSingleProduct(productId))
      dispatch(receiveSimilarProducts(productId))
      dispatch(receiveProductReviews(productId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)

