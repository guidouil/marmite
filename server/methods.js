Meteor.methods({
  insertFakeProduct: function () {
    var product = {
      name: Fake.word(),
      description: Fake.sentence(),
      imageUrl: 'http://lorempixel.com/70/70',
      price: Math.random() * 100
    };
    return Products.insert(product);
  }
});
