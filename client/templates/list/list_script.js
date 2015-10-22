Template.list.helpers({
  products: function () {
    return Products.find({}, {sort: {createdAt: -1}}).fetch();
  },
  fromNow: function (date) {
    if (date) {
      moment.locale('en');
      return moment(date).fromNow();
    }
  },
  getImg: function (image) {
    if (! image) return '/favicon.png';
    return image;
  },
  plus: function (a, b) {
    return a + b;
  }
});

Template.list.events({
  'click [data-action=edit]': function (evt) {
    Router.go('/edit/' + this._id);
  },
  'click [data-action=delete]': function (evt) {
    var productId = this._id;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      closeOnConfirm: false
    }, function () {
      Products.remove({_id: productId});
      swal('Deleted!', 'The product has been deleted.', 'success');
    });
  },
  'scroll .list': function (event) {
    event.preventDefault();
    var el = event.target;
    if (el.offsetHeight !== el.scrollHeight) {
      if (el.scrollTop + el.offsetHeight > el.scrollHeight - 200) {
        handle.loadNextPage();
      }
    }
  }
});

Template.list.onRendered(function ( ){

});
