import React, { Component } from 'react'
import {connect} from 'react-redux'
import Splash from './Splash'

const mapStateToProps = (state) => {
  return { products: state.products.products }
}


export class Products extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    var productDivs = this.props.products.map(function(product) {
          return(
            <div key={product.id} className="column-3 catalog-tile">
              <h4>{product.name}</h4>
              <div className="product-thumbnail"><img src={product.thumbnail} /></div>
            </div>
          )
      });

    return(
      <div>
        <Splash />
  	    <div className="container catalog">
  		    {productDivs}
  	    </div>
      </div>
		)
	}
}


export default connect(mapStateToProps)(Products)
