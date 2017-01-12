import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return { products: state.products.products }
}


export class Products extends Component {

  constructor(props) {
    super(props)
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
  }

  render() {

    var productDivs = this.props.products.map(function(product) {
          return(
            <div key={product.id} className="column-3">
              <h4>{product.name}</h4>
              <div><img src={product.thumbnail} /></div>
              <p>Price: ${product.price}</p>
            </div>
          )
      });

    return(
	   <div className="container catalog">
		  {productDivs}
	   </div>
		)
	}
}


export default connect(mapStateToProps)(Products)
