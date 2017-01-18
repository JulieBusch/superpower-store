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
<<<<<<< HEAD
<<<<<<< HEAD
    this.splitIntoRows = this.splitIntoRows.bind(this)
  }

  splitIntoRows(arr) {
    var counter = 0;
    var groupedArr = [];
    var row = [];
    for(var i = 0; i < arr.length; i++) {
      if(counter < 3) {
        row.push(arr[i]);
        counter++;
      } else {
        groupedArr.push(row);
        row = [];
        counter = 0;
        row.push(arr[i]);
        counter++;
      }
      if(i===arr.length - 1 && counter < 3) {
        groupedArr.push(row);
      }
    }
    return groupedArr;
=======

=======
>>>>>>> e0179fd6bdd54262859181643021733bd365b970
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick(productId) {
    console.log('product id: ', productId)
    this.props.selectProduct(productId)
>>>>>>> 871050f865225054602645f591d94a80433e47b8
  }

  render() {

<<<<<<< HEAD
    var productDivs = this.props.products.map(function(product) {
          return(
            <div key={product.id} className="column-3">
              <h4>{product.name}</h4>
              <div><img src={product.thumbnail} /></div>
              <p>Price: ${product.price}</p>
=======
    var productDivs = this.props.products.map((product) => {
          return (
            <div key={product.id} className="column-3 catalog-tile">
              <h4>{product.name}</h4>
              <div className="product-thumbnail">
                <Link to='#' onClick={this.handleClick.bind(this, product.id)}>
                  <img src={product.thumbnail} />
                </Link>
              </div>
>>>>>>> 871050f865225054602645f591d94a80433e47b8
            </div>
          )
      });

<<<<<<< HEAD
    return(
<<<<<<< HEAD
	   <div className="container catalog">
		  {productDivs}
	   </div>
=======
=======
    return (
>>>>>>> e0179fd6bdd54262859181643021733bd365b970
      <div>
        <Splash />
  	    <div className="container catalog">
          {this.props.selectedProduct.id && <SingleProduct />}
  		    {productDivs}
  	    </div>
      </div>
>>>>>>> 871050f865225054602645f591d94a80433e47b8
		)
	}
}


<<<<<<< HEAD
export default connect(mapStateToProps)(Products)
=======
/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = (state) => {
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
>>>>>>> 871050f865225054602645f591d94a80433e47b8
