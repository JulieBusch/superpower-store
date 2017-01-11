import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
	return { products: state.products.products }
}


class Products extends Component {

  constructor(props) {
    super(props)
  }

	render() {

    const productDivs = this.props.products.map(function(product) {
      return (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <img src={product.thumbnail} />
          <p>Price: ${product.price}</p>
        </div>
      )
    });

		return(
			<div>
				{productDivs}
			</div>
			)
	}
}


export default connect(mapStateToProps)(Products)
