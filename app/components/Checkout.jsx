import React from 'react'
import { connect } from 'react-redux'
import { updateOrderStatus } from '../reducers/order'


const mapStateToProps = (state) => {
  return ({
    selectedOrder: state.orders.selectedOrder
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderStatus: (order) => {
      dispatch(updateOrderStatus(order))
      //browserHistory.push()
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(class Checkout extends React.Component {

constructor(props) {
  super(props)

  this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit(e) {
  e.preventDefault();
  console.log('selectedOrder', this.props.selectedOrder)
  this.props.updateOrderStatus({ id: this.props.selectedOrder.id, status: 'shipping'})

}

render() {
  return (
      <div className="checkout-form">

   <fieldset>
      <legend>
         <h4>Checkout</h4>
      </legend>

      <div className="form_div">

         <form onSubmit={this.handleSubmit}>

            <div>

               <label htmlFor="name"> Name </label><br/>

               <input type="text" name="name" className="input_text" />


            </div>
            <div>

               <label htmlFor="email"> E-mail </label>
               <input type="text" name="email" className="input_text" />

            </div>

            <div>

               <label htmlFor="phone"> Phone Number </label>
               <input type="text" name="phone" className="input_text" />

            </div>
            <div>

               <label htmlFor="dob"> Address </label>
               <input type="text" name="dob" className="input_text" />

            </div>
            <div>

               <label htmlFor="dob"> Zip Code </label>
               <input type="text" name="dob" className="input_text" />

            </div>
            <div>

               <div className="leftside_form_div">
               <label htmlFor="status"> Status </label>
               <select name="status" className="input_select left">
                  <option default>--Select State--</option>
                  <option value="NY">New York</option>
                  <option value="NY">New York</option>
                  <option value="NY">New York</option>
                  <option value="NY">New York</option>

               </select>
               </div>

               <div className="rightside_form_div">
               <label htmlFor="country">  &nbsp; Country </label>
               <select name="country" className="input_select right">
                  <option default>--Select Country--</option>
                  <option default>United States</option>
                  <option default>Canada</option>
                  <option default>Mexico</option>



               </select>
               </div>

            </div>
            <div>

               <button type="submit" className="btn_submit right">Submit</button>
               <button type="reset" className="btn_submit right">Reset</button>

            </div>

         </form>

      </div>
   </fieldset>
      </div>
    )
}

})

