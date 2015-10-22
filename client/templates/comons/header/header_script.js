Template.header.helpers({

});

Template.header.events({
  'click [data-action=sidebar]': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  },
  'click [data-action=goHome]': function () {
    Router.go('home');
  },
});

Template.header.onRendered(function ( ) {
});
