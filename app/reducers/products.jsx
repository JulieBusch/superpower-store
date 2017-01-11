import axios from 'axios'

const initialProductsState = {
	products: []
}

const reducer = (state = initialProductsState, action) => {

	const newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_ALL_PRODUCTS:
		newState.products = action.products;
		break;

		default:
		return state;
	}

	return newState
}

const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS'

export const allProducts = products => ({
	type: RECEIVE_ALL_PRODUCTS, products
})

export const receiveAllProducts = () => 
	dispatch => 
		axios.get('/api/products')
			.then(res => res.data)
			.then((foundProducts) => dispatch(allProducts(foundProducts)))
			.catch((failed) => dispatch(allProducts(["products dispatch failure"])))




export default reducer
