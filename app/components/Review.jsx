import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import axios from 'axios'

import StarRatingComponent from 'react-star-rating-component';

/* -----------------    COMPONENT     ------------------ */


export class Review extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      text: ""
    }

    this.onStarClick = this.onStarClick.bind(this)
    this.formSubmission = this.formSubmission.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onStarClick(nextVal, prevVal, name) {
    this.setState({rating: nextVal})
  }

  formSubmission(evt) {
    evt.preventDefault()
    var body = {
      rating: this.state.rating,
      text: this.state.text,
      user_id: this.props.user.id,
      product_id: this.props.product.id
    }
    axios.post(`api/users/${this.props.user.id}/addReview`, body)
    .then(res => res.data)
    .then(review => console.log(review))
    .catch(err => console.log(err))
    this.setState({
      rating: 0,
      text: ""
    });
  }

  handleChange(evt) {
    this.state.text = evt.target["review-text"]
  }

  render() {
    return (
      <div className="container reviews">
        <h3>{this.props.product.name}</h3>
        <div>
          <img src={this.props.product.image} />
        </div>
        <span>Your Rating:</span>
        <StarRatingComponent name="rating" onStarClick={this.onStarClick} />
        <form onSubmit={this.formSubmission} >
          <textarea name="review-text" placeholder="Write your review here" rows="10" cols="75" onChange={this.handleChange}>
          </textarea>
          <button type="submit" className="submit-btn"> Submit </button>
        </form>
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
