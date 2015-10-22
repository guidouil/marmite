Template.sidebar.helpers({

});

Template.sidebar.events({
  'click a.item': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  }
});

Template.sidebar.onRendered(function ( ){

});
