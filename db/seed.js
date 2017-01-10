const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))



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


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
