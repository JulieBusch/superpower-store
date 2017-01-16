const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedOrders = () => db.Promise.map([
  {user_id: 1, status: 'open'},
  {user_id: 1, status: 'completed'},
  {user_id: 2, status: 'shipping'}
], order => db.model('orders').create(order))

const seedProducts = () => db.Promise.map(productsArr, product => db.model('products').create(product))

const productsArr = [
	{
	  name: 'Flight',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'hkjdhkjh',
	  price: 130.00,
	  tags: ["cool", "awesome"],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Ethical X-ray Vision',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'hkjdhkjh',
	  price: 125.00,
	  tags: ["lame", "ethical"],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Magnanimity',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'hkjdhkjh',
	  price: 120.00,
	  tags: ["awesome", "ethical"],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Telekinesis',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'hkjdhkjh',
	  price: 100.00,
	  tags: ["awesome", "dangerous"],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	}
]

const seedOrderlines = () => db.Promise.map([
  {order_id: 3, product_id: 2, quantity: 3},
  {order_id: 1, product_id: 4, quantity: 1},
  {order_id: 2, product_id: 1, quantity: 1}
], orderline => db.model('orderlines').create(orderline))


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedOrders)
  .then(orders => console.log(`Seeded ${orders.length} orders OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedOrderlines)
  .then(orderlines => console.log(`Seeded ${orderlines.length} orders OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
