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
	  image:'hjkhk',
	  description: 'hkjdhkjh',
	  price: 12.00,
	  tags: ["cool", "awesome"],
	  thumbnail: 'hjkhk'
	},
	{
	  name: 'Ethical X-ray Vision',
	  image:'hjkhk',
	  description: 'hkjdhkjh',
	  price: 12.00,
	  tags: ["lame", "ethical"],
	  thumbnail: 'hjkhk'
	},
	{
	  name: 'Magnanimity',
	  image:'hjkhk',
	  description: 'hkjdhkjh',
	  price: 12.00,
	  tags: ["awesome", "ethical"],
	  thumbnail: 'hjkhk'
	},
	{
	  name: 'Telekinesis',
	  image:'hjkhk',
	  description: 'hkjdhkjh',
	  price: 12.00,
	  tags: ["awesome", "dangerous"],
	  thumbnail: 'hjkhk'
	}
]

const seedOrderlines = () => db.Promise.map([
  {order_id: 3, product_id: 2, quantity: 3, itemPrice: 3.00},
  {order_id: 1, product_id: 4, quantity: 1, itemPrice: 12.00},
  {order_id: 2, product_id: 1, quantity: 1, itemPrice: 12.00}
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
