import axios from 'axios'

const initialProductsState = {
	products: [],
	selectedProduct: {},
	similarProducts: []
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

		case RECEIVE_SIMILAR_PRODUCTS:
		newState.similarProducts = action.products;
		break;

		default:
		return state;
	}

	return newState
}

/*----------------ACTION CREATORS------------------*/

const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS'
const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT'
const RECEIVE_SIMILAR_PRODUCTS = 'RECEIVE_SIMILAR_PRODUCTS'

export const allProducts = products => ({
	type: RECEIVE_ALL_PRODUCTS, products
})

export const singleProduct = product => ({
	type: RECEIVE_SINGLE_PRODUCT, product
})

export const similarProducts = products => ({
	type: RECEIVE_SIMILAR_PRODUCTS, products
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

export const receiveSimilarProducts = (productId) =>
	dispatch =>
		axios.get(`/api/products/${productId}/similar`)
			.then(res => res.data)
			.then((foundProducts) => dispatch(similarProducts(foundProducts)))
			.catch((failed) => dispatch(singleProduct(["similar products dispatch failure"])))

export default reducer
