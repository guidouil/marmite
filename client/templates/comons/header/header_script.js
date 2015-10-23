Template.header.helpers({

});

Template.header.events({
  'click [data-action=sidebar]': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  },
  'click [data-action=goHome]': function () {
    Router.go('home');
  },
  'click [data-action=addProduct]': function () {
    Meteor.call('insertFakeProduct');
    Router.go('list');
  },
});

Template.header.onRendered(function ( ) {
});
