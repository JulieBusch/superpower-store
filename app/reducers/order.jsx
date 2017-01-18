import axios from 'axios'

const initialState = {
   orders: [],
   selectedOrder: {},
   selectedOrderDetails: []
}

/* -----------------    ACTIONS     ------------------ */

const SELECTED_ORDER = 'SELECTED_ORDER'
const CREATED_ORDER = 'CREATED_ORDER'
const ALL_ORDERS = 'ALL_ORDERS'
const UPDATED_ORDER = 'UPDATED_ORDER'
const SELECTED_DETAILS = 'SELECTED_DETAILS'

/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {

   const newState = Object.assign({}, state)

   switch (action.type) {

      case SELECTED_ORDER:
      newState.selectedOrder = action.order
      break

      case CREATED_ORDER:
      newState.orders = [action.order, ...state.orders]
      break

      case ALL_ORDERS:
      newState.orders = action.orders
      break

      case UPDATED_ORDER:
      newState.selectedOrder = action.order
      break

      case SELECTED_DETAILS:
      newState.selectedOrderDetails = action.orderDetails
      break

      default:
      return state

   }

   return newState
}


/* ------------   ACTION CREATORS     ------------------ */

export const selectedOrder = order => ({
   type: SELECTED_ORDER, order
})

export const selectedOrderDetails = orderDetails => ({
   type: SELECTED_DETAILS, orderDetails
})

export const createdOrder = order => ({
   type: CREATED_ORDER, order
})

export const allOrders = orders => ({
   type: ALL_ORDERS, orders
})

export const updatedOrderStatus = order => ({
   type: UPDATED_ORDER, order
})

export const updatedOrderProducts = order => ({
   type: UPDATED_ORDER, order
})

export const updatedOrderUser = order => ({
   type: UPDATED_ORDER, order
})

/* ------------       DISPATCHERS     ------------------ */

export const selectOrder = (orderId) =>
   dispatch =>
      axios.get(`/api/orders/${orderId}`)
         .then(res => res.data)
         .then((foundOrder) => dispatch(selectedOrder(foundOrder)))

         .catch((failed) => dispatch(selectedOrder({})))

export const selectOrderDetails = (orderId) =>
   dispatch => {
      return axios.get(`/api/orders/${orderId}/orderline`)
         .then(res => {
            return   res.data})
         .then((foundOrderDetails) => dispatch(selectedOrderDetails(foundOrderDetails)))
         .catch((failed) => dispatch(selectedOrderDetails([])))
      }

// export const addNewOrder = () =>
//    dispatch =>
//       axios.post('/api/orders/')
//          .then(res => res.data)
//          .then(newOrder =>  {
//             dispatch(createdOrder(newOrder))
//             return dispatch(selectedOrder(newOrder))
//          })
//          .catch(failed => console.log(failed))

export const addNewOrder = (productId) => {
   var product_id = productId
   return (dispatch, _, productId) => {
      axios.post('/api/orders/')
         .then(res => res.data)
         .then(newOrder =>  {
            dispatch(createdOrder(newOrder))
            return newOrder
         })
         .then(order => {
            return axios.put(`/api/orders/${order.id}/product/${product_id}`)
         })
         .then(updatedOrder => {
            dispatch(updatedOrderProducts(updatedOrder.data))
            return updatedOrder
         })
         .then((order) => {
            return axios.get(`/api/orders/${order.data.id}/orderline`)
         })
         .then((foundOrderDetails) => {
            dispatch(selectedOrderDetails(foundOrderDetails.data))
            })
         .catch((failed) => console.log(failed))
   }
}


export const getAllOrders = () =>
   dispatch =>
      axios.get('/api/orders')
         .then(res => res.data)
         .then(foundOrders => dispatch(allOrders(foundOrders)))
         .catch(failed => console.log(failed))

export const getAllOrdersByUserId = (userId) =>
   dispatch =>
      axios.get(`/api/orders/user/${userId}`)
         .then(res => res.data)
         .then(foundOrders => dispatch(allOrders(foundOrders)))
         .catch(failed => console.log(failed))

export const getOpenOrderByUserId = (userId) =>
   dispatch =>
      axios.get(`/api/orders/user/${userId}/open`)
         .then(res => res.data)
         .then(foundOrder => dispatch(selectedOrder(foundOrder)))

         .catch(failed => console.log(failed))

export const updateOrderStatus = (order) =>
   dispatch =>
      axios.put(`/api/orders/${order.id}`, order)
         .then(res => res.data)
         .then(updatedOrder => dispatch(updatedOrderStatus(updatedOrder)))
         .catch((failed) => console.log(failed))

export const updateOrderUser = (order) =>
   dispatch =>
      axios.put(`/api/orders/${order.id}/setuser/${order.user_id}`, order)
         .then(res => res.data)
         .then(updatedOrder => dispatch(updatedOrderUser(updatedOrder)))
         .catch((failed) => console.log(failed))

export const updateOrder = (order) =>
   dispatch => {
      return axios.put(`/api/orders/${order.orderId}/product/${order.productId}`)
      .then(res => res.data)
      .then(updatedOrder => dispatch(updatedOrderProducts(updatedOrder)))
         .catch((failed) => console.log(failed))
   }

export const deleteProductFromOrder = (order) =>
   dispatch =>
      axios.delete(`/api/orders/${order.orderId}/product/${order.productId}`)
         .then(() => dispatch(selectOrderDetails(order.orderId)))
         .then(() => {
            console.log('DISPATCHING!  ')
            dispatch(selectOrder(order.orderId))

         })
         .catch((failed) => console.log(failed))

export default reducer
