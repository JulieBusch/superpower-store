import axios from 'axios'

const initialState = {
   selectedUser: {}
}

const reducer = (state = initialState, action) => {

   const newState = Object.assign({}, state);

   switch(action.type) {
      case SELECTED_USER:
      newState.selectedUser = action.user;
      break;

      default:
      return state;

   }

   return newState
}

const SELECTED_USER = 'SELECTED_USER'

export const selectedUser = user => ({
   type: SELECTED_USER, user
})


export const selectUser = (userId) =>
   dispatch =>
      axios.get(`/api/users/${userId}`)
         .then(res => res.data)
         .then((foundUser) => dispatch(selectedUser(foundUser)))
         .catch((failed) => dispatch(selectedUser({})))


export default reducer
