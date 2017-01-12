import axios from 'axios'

const initialState = {
   orders: [],
   selectedOrder: {}
}

/* -----------------    ACTIONS     ------------------ */

const SELECTED_ORDER = 'SELECTED_ORDER'
const CREATED_ORDER = 'CREATED_ORDER'
const ALL_ORDERS = 'ALL_ORDERS'


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

      default:
      return state

   }

   return newState
}


/* ------------   ACTION CREATORS     ------------------ */

export const selectedOrder = order => ({
   type: SELECTED_ORDER, order
})

export const createdOrder = order => ({
   type: CREATED_ORDER, order
})

export const allOrders = orders => ({
   type: ALL_ORDERS, orders
})

/* ------------       DISPATCHERS     ------------------ */

export const selectOrder = (orderId) =>
   dispatch =>
      axios.get(`/api/orders/${orderId}`)
         .then(res => res.data)
         .then((foundOrder) => dispatch(selectedOrder(foundOrder)))
         .catch((failed) => dispatch(selectedOrder({})))


export const addNewOrder = (order) =>
   dispatch =>
      axios.post('/api/order/', order)
         .then(res => res.data)
         .then(newOrder => dispatch(createdOrder(newOrder)))
         .catch(failed => console.log(failed))


export const getAllOrders = () =>
   dispatch =>
      axios.get('/api/orders')
         .then(res => res.data)
         .then(foundOrders => dispatch(allOrders(foundOrders)))
         .catch(failed => console.log(failed))


export default reducer
