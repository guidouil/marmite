if (Meteor.isServer) {
  Meteor.startup(function () {
    // inserting fake products
    var productsCount = Products.find({}).count();
    if (productsCount === 0) {
      for (var i = 0; i < 80; i++) {
        Meteor.call('insertFakeProduct');
      }
    }
  });
}
