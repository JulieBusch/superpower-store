import axios from 'axios'

const initialState = {
   users: [],
   selectedUser: {},
}

/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {

   const newState = Object.assign({}, state)

   switch(action.type) {

      case SELECTED_USER:
      newState.selectedUser = action.user
      break

      case CREATED_USER:
      newState.users = [action.user, ...state.users]
      break

      case ALL_USERS:
      newState.users = action.users
      break

      default:
      return state

   }

   return newState
}

/* -----------------    ACTIONS     ------------------ */

const SELECTED_USER = 'SELECTED_USER'
const CREATED_USER = 'CREATED_USER'
const ALL_USERS = 'ALL_USERS'

/* ------------   ACTION CREATORS     ------------------ */

export const selectedUser = user => ({
   type: SELECTED_USER, user
})

export const createdUser = user => ({
   type: CREATED_USER, user
})

export const allUsers = users => ({
   type: ALL_USERS, users
})

/* ------------       DISPATCHERS     ------------------ */

export const selectUser = (userId) =>
   dispatch =>
      axios.get(`/api/users/${userId}`)
         .then(res => res.data)
         .then((foundUser) => dispatch(selectedUser(foundUser)))
         .catch((failed) => dispatch(selectedUser({})))


export const addNewUser = (user) =>
   dispatch =>
      axios.post('/api/users/', user)
         .then(res => res.data)
         .then(newUser => dispatch(createdUser(newUser)))
         .catch(failed => console.log(failed))


export const getAllUsers = () =>
   dispatch =>
      axios.get('/api/users')
         .then(res => res.data)
         .then(foundUsers => dispatch(allUsers(foundUsers)))
         .catch(failed => console.log(failed))


export default reducer
