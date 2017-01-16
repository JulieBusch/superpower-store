const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
  {name: 'Lindsay Lohan', email: 'lindsay@example.com', password: '1234'},
  {name: 'Ortho Stice', email: 'theDarkness@example.com', password: '1234'},
  {name: 'Dennis Hoey', email: 'dennis@example.com', password: '1234'},
], user => db.model('users').create(user))



const seedProducts = () => db.Promise.map(productsArr, product => db.model('products').create(product))

const productsArr = [
	{
	  name: 'Flight',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'Soar as high as you dare. No mechanical augmentation is required for our flight power; simply float freely at will. Maximum attainable speed while flying is 20mph. Flight speed can increase when Flight is combined with Super Speed.',
	  price: 1200000.00,
	  tags: ['natural non-human abilities', 'flight'],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Ethical X-ray Vision',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'Ethical X-ray Vision gives you the ability to see through solid objects without compromising as much of your fellow citizens\' privacy. Our leading engineers have developed X-ray vision powers that will not reveal the nude body of another person if it is shielded by clothing or other barriers, but will not interfere with normal human vision when a person willingly disrobes in your presence. Your neighbors will appreciate knowing that their dignity remains intact.',
	  price: 850000.00,
	  tags: ['not of this world', 'ethical'],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Super Speed',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'Super Speed will enable you to not only run faster than imaginable, but will give you the power to quicken any movement you desire. React to any situation in the blink of an eye. Maximum attainable speed is 227mph. Combine with Flight and experience the thrill of a peregrin falcon\'s dive.',
	  price: 1050000.00,
	  tags: ['enhanced human capabilities', 'speed', 'transportation'],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
	{
	  name: 'Telekinesis',
	  image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
	  description: 'Move physical objects with only a thought. Initially you will be able to move items up to 15 lbs. for approximately 10 seconds at a time. Our telekinesis strengthens with practice; you will find yourself able to move heavier objects and hold them in the air for longer periods as you exercise your new powers.',
	  price: 1350000.00,
	  tags: ['mind powers', 'not of this world'],
	  thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
	},
  {
    name: 'Precognition',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'See the future, change your destiny. Precognition will give you visions of what is yet to come. Note: the effects of Precognition are not predictable. Visions cannot be called up at will; they will come to you at random and may be cryptic if not impossible to decipher. We feel that the potential benefits of seeing ahead in time, even in a relatively uncontrolled manner, are useful and worthy of our endorsement. But, should you feel your sanity unraveling after receiving this power, please contact our customer service line immediately.',
    price: 45000000.00,
    tags: ['psychic powers', 'not of this world'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Telepathy',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Hear the secret thoughts of those around you. We have used cutting-edge science to bring to you the power to read the mind of any person who is not equipped with our Occlusion ability. Our most recent edition of Psychic Mind Reading allows you to tune in to an individual\'s thoughts when desired and tune out when necessary, avoiding the overwhelming din of hearing the thoughts of everyone around you at all times.',
    price: 2900000.00,
    tags: ['psychic powers', 'not of this world'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Occlusion',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Occlusion puts a barrier between your thoughts and those who would try to read them without your permission. This power is guaranteed to block the power of Telepathy when it is directed at you, keeping your private thoughts safe.',
    price: 2999000.00,
    tags: ['psychic powers', 'not of this world'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Hearing',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Hear every whisper within a .25-mile radius. Know where you stand in the workplace, where your children will really be this weekend, and more.',
    price: 900000.00,
    tags: ['enhanced human capabilities', 'hearing'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Sight',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'See clearly for miles. Super Sight will allow you to identify a person\'s face up to 3.7 miles away. Never miss a single detail again.',
    price: 975000.00,
    tags: ['enhanced human capabilities', 'sight'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Smell',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Detect scents up to .18 miles away. Save your neighbors and yourself from natural gas leaks and poisons, or enjoy the aroma of a pie cooling in a windowsill a few blocks over.',
    price: 780000.00,
    tags: ['enhanced human capabilities', 'smell'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Strength',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Easily lift a car over your head without gaining too much bulk. Super Strength allows you to move up to 4,000 lbs. without breaking a sweat, and will cause a minimal increase in visible muscle mass.',
    price: 1400000.00,
    tags: ['enhanced human capabilities', 'strength'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Healing',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Your body will heal its injuries in a mere fraction of the time it would take an unenhanced individual to do so. Healing time is still proportionate to the amount of damage done. Flesh wounds disappear almost immediately; more egregious injuries will take longer. Note: You may still be killed if you possess the power of Super Healing. Super Healing cannot bring you back from the dead; any instantaneously fatal injury will end your life. Super Healing will not allow you to regenerate severed body parts.',
    price: 1600000.00,
    tags: ['enhanced human capabilities', 'healing'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Ethical Invisibility',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Ethical Invisibility gives you the power to become completely transparent on a whim. Our latest version will also render anything you are wearing invisible upon activation, eliminating the need for removing all of one\'s clothing to remain undetected. Ethical Invisibility will not activate when you are in the presence of an individual in a state of undress who has not consented to being viewed by you in such a state.',
    price: 850000.00,
    tags: ['not of this world', 'ethical'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Energy Manipulation',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Control various forms of energy in your immediate location. Gather up electricity from your surrounding environment to generate lightning from your fingertips. Gather kinetic energy to create concussive bursts of power. Direct heat from one area to another. The possible uses of this power are nearly limitless. Note: the Energy Manipulation power cannot violate the natural law of Conservation of Energy.',
    price: 3800000.00,
    tags: ['natural non-human abilities', 'electricity', 'energy'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Shape Shifting',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Transform yourself into any extant animal or person at will and use any capabilities that person or creature\'s body possesses. Note: it is highly recommended that you do not spend more than 2.5 hours in a form that is not your own.',
    price: 5900000.00,
    tags: ['not of this world'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Immortality',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'With Immortality you will cease to age and your body will become invulnerable to the time. Note: You can still be killed with the current version of Immortality. This immortality will not prevent death caused by anything other than natural aging. It is recommended that this power is acquired by adults between the ages of 27 and 40 for maximum benefits; Immortality will freeze the body\'s development upon acquisition and cannot undo any effects of time that have already occurred. Combine Immortality with Super Healing for added longevity.',
    price: 90000000.00,
    tags: ['not of this world', 'enhanced human capabilities'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Super Agility',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Gain unparalleled reflexes with this power. Your extraordinary physical response time will help you evade all manner of mishaps. Combine with Super Speed for astounding results.',
    price: 2100000.00,
    tags: ['enhanced human capabilities'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Weather Manipulation',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Control the skies above you on a whim. Weather Manipulation will allow you to change the weather condtions within a 1-mile radius of your location. Create or clear a storm with ease; dictate the precipitation, cloud formations, and wind speed and direction.',
    price: 33000000.00,
    tags: ['not of this world'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
  {
    name: 'Teleportation',
    image:'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png',
    description: 'Vanish from your current location and instantaneously reappear in any unoccupied space within a 5-mile radius without occupying any space between your start point and destination. Note: take care to only teleport to a place that your body can occupy; teleporting to an already-occupied space has severe adverse effects.',
    price: 67000000.00,
    tags: ['not of this world', 'transportation'],
    thumbnail: 'https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'
  },
]


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
