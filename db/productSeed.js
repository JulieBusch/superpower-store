const Product = require('./models/product');

var flight = Product.create({
  name: 'Flight',
  image:'hjkhk',
  description: 'hkjdhkjh',
  price: 12.00,
  tags: ["cool", "awesome"],
  thumbnail: 'hjkhk'
});

var ethicalXrayVision = Product.create({
  name: 'Ethical X-ray Vision',
  image:'hjkhk',
  description: 'hkjdhkjh',
  price: 12.00,
  tags: ["lame", "ethical"],
  thumbnail: 'hjkhk'
});

var magnanimity = Product.create({
  name: 'Magnanimity',
  image:'hjkhk',
  description: 'hkjdhkjh',
  price: 12.00,
  tags: ["awesome", "ethical"],
  thumbnail: 'hjkhk'
});

var telekinesis = Product.create({
  name: 'Telekinesis',
  image:'hjkhk',
  description: 'hkjdhkjh',
  price: 12.00,
  tags: ["awesome", "dangerous"],
  thumbnail: 'hjkhk'
});

Promise.all([flight, ethicalXrayVision, magnanimity, telekinesis])
  .then(console.log('seed done!'))
  .catch();
