import axios from 'axios'

const initialProductsState = {
	products: [],
	selectedProduct: {},
	similarProducts: [],
	selectedProductReviews: []
}

/*----------------REDUCER------------------*/

const reducer = (state = initialProductsState, action) => {

	const newState = Object.assign({}, state)

	switch(action.type){
		case RECEIVE_ALL_PRODUCTS:
		newState.products = action.products
		break

		case RECEIVE_SINGLE_PRODUCT:
		newState.selectedProduct = action.product
		break;

		case RECEIVE_SIMILAR_PRODUCTS:
		newState.similarProducts = action.products
		break;

		case CLEAR_SELECTED_PRODUCT:
		newState.selectedProduct = {}
		break;

		case CLEAR_SIMILAR_PRODUCTS:
		newState.similarProducts = []
		break;

		case CLEAR_PRODUCT_REVIEWS:
		newState.selectedProductReviews = []
		break;

		case RECEIVE_PRODUCT_REVIEWS:
		newState.selectedProductReviews = action.reviews
		break;

		default:
		return state
	}

	return newState
}

/*----------------ACTION CREATORS------------------*/

const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS'
const RECEIVE_SINGLE_PRODUCT = 'RECEIVE_SINGLE_PRODUCT'
const RECEIVE_SIMILAR_PRODUCTS = 'RECEIVE_SIMILAR_PRODUCTS'
const CLEAR_SELECTED_PRODUCT = 'CLEAR_SELECTED_PRODUCT'
const CLEAR_SIMILAR_PRODUCTS = 'CLEAR_SIMILAR_PRODUCTS'
const RECEIVE_PRODUCT_REVIEWS = 'RECEIVE_PRODUCT_REVIEWS'
const CLEAR_PRODUCT_REVIEWS = 'CLEAR_PRODUCT_REVIEWS'

export const allProducts = products => ({
	type: RECEIVE_ALL_PRODUCTS, products
})

export const singleProduct = product => ({
	type: RECEIVE_SINGLE_PRODUCT, product
})

export const similarProducts = products => ({
	type: RECEIVE_SIMILAR_PRODUCTS, products
})

export const clearSelectedProduct = () => ({
	type: CLEAR_SELECTED_PRODUCT
})

export const clearSimilarProducts = () => ({
	type: CLEAR_SIMILAR_PRODUCTS
})

export const productReviews = reviews => ({
	type: RECEIVE_PRODUCT_REVIEWS, reviews
})

export const clearProductReviews = () => ({
	type: CLEAR_PRODUCT_REVIEWS
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

export const receiveProductReviews = (productId) =>
	dispatch =>
		axios.get(`/api/products/${productId}/reviews`)
			.then(res => res.data)
			.then((foundReviews) => dispatch(productReviews(foundReviews)))
			.catch((failed) => dispatch(productReviews(["product reviews dispatch failure"])))

export default reducer
