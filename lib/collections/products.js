Products = new Mongo.Collection('products');

Products.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

var Schemas = {};
Schemas.Products = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 250
  },
  description: {
    type: String,
    label: 'Descritpion',
    max: 250,
    optional: true
  },
  imageUrl: {
    type: String,
    label: 'Image url',
    max: 250,
    optional: true
  },
  price: {
    type: Number,
    decimal: true,
    label: 'Price',
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    autoform :
    {
      omit: true
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform :
    {
      omit: true
    }
  }
});

Products.attachSchema(Schemas.Products);

Ground.Collection(Products);
