import React from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import axios from 'axios'

import StarRatingComponent from 'react-star-rating-component';

/* -----------------    COMPONENT     ------------------ */


export class Review extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      text: "",

      fresh: true,
      disabled: true
    }

    this.onStarClick = this.onStarClick.bind(this)
    this.formSubmission = this.formSubmission.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nameParser = this.nameParser.bind(this)
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

  handleChange(evt) {
    // console.log(this.state.text)
    this.setState({
      text: evt.target.value,
      fresh: false
    })

    if (this.state.text.length >= 50 && this.state.rating > 0) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  onStarClick(nextVal, prevVal, name) {
    this.setState({
      rating: nextVal
    })

    if (this.state.text.length >= 50 && this.state.rating > 0) {
      this.setState({
        disabled: false
      })
    }
  }

  formSubmission(evt) {
    evt.preventDefault()

    var body = {
      rating: +this.state.rating,
      text: this.state.text,
      user_id: +this.props.user.id,
      product_id: +this.props.product.id
    }

    axios.post(`api/users/${this.props.user.id}/review`, body)
    .then(res => res.data)
    .then(review => console.log(review))
    .catch(err => console.log(err))

    // this.setState({
    //   rating: 0,
    //   text: ""
    // });
    browserHistory.push(`/`)
  }

  render() {
    return (
      <div className="container reviews">
        <h3>{this.props.product.name}</h3>
        <div className={`product-thumbnail ${this.nameParser(this.props.product.name)}`}>
          <img src={`./thumbnails/${this.props.product.thumbnail}`} />
        </div>
        <span>Your Rating:</span>
        <StarRatingComponent
          name="rating"
          onStarClick={this.onStarClick}
          value={this.state.rating}
        />
        <form onSubmit={this.formSubmission} >
          <textarea
            name="text"
            placeholder="Write your review here"
            rows="10"
            cols="75"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            disabled={this.state.disabled}
            className="submit-btn"
          >
          Submit
          </button>
        </form>
        <div>
          {(!this.state.fresh && this.state.text.length < 50) &&
            <div className="warning">Minimum length for a review is 50 characters.</div>}
        </div>
      </div>
    )
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = state => {
   return ({
      product: state.products.selectedProduct,
      user: state.auth
   })
};

// const mapDispatchToProps = dispatch => {}
// // equivalent to:
// const mapDispatch = (dispatch) => {
//   return {
//     signup: function (credentials) {
//       dispatch(signupAndGoToUser(credentials));
//     }
//   };
// };

export default connect(mapStateToProps)(Review);
