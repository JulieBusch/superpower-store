import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
	return { products: state.products.products }
}


class Products extends Component{
	




	render() {
		return(
			<div>
				Hello
			</div>
			)
	}
}


export default connect(mapStateToProps)(Products)