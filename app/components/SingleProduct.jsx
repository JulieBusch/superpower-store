import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import { clearSelectedProduct, clearSimilarProducts } from '../reducers/products'

/*-----------------COMPONENT------------------*/

export class SingleProduct extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.clearDetailView()
  }

  render() {
    var selectedProduct = this.props.selectedProduct
    return(
      <div className="popUp">
        <div className="column-2">
          <Link to="#" onClick={this.handleClick} >Close</Link>
          <img src={selectedProduct.image} />
          <div>
            {/*selectedProduct.tags.map(function(tag){
              return (<p>{tag}</p>)
            })*/}
          </div>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
