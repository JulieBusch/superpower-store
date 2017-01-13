import axios from 'axios'

const initialProductsState = {
	products: [],
	selectedProduct: {}
}

/*----------------REDUCER------------------*/

const reducer = (state = initialProductsState, action) => {

	const newState = Object.assign({}, state);

	switch(action.type){
		case RECEIVE_ALL_PRODUCTS:
		newState.products = action.products;
		break

		case RECEIVE_SINGLE_PRODUCT:
		newState.selectedProduct = action.product;
		break;

		default:
		return state;
	}

	return newState
}

/*----------------ACTION CREATORS------------------*/

const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS'
const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT'

export const allProducts = products => ({
	type: RECEIVE_ALL_PRODUCTS, products
})

export const singleProduct = product => ({
	type: RECEIVE_SINGLE_PRODUCT, product
})

/*----------------AJAX REQUESTS------------------*/

export const receiveAllProducts = () =>
	dispatch =>
		axios.get('/api/products/')
			.then(res => res.data)
			.then((foundProducts) => dispatch(allProducts(foundProducts)))
			.catch((failed) => dispatch(allProducts(["products dispatch failure"])))

export const receiveSingleProduct = (productId) =>
	dispatch =>
		axios.get(`/api/products/${productId}`)
			.then(res => res.data)
			.then((foundProduct) => dispatch(singleProduct(foundProduct)))
			.catch((failed) => dispatch(singleProduct({note: "failure"})))



export default reducer
