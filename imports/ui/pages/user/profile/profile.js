import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './profile.html';

Template.profile.onCreated(() => {
  Meteor.setTimeout(() => {
    $('#profileForm').form({
      fields: {
        firstname: ['empty'],
        lastname: ['empty'],
      },
    });
  }, 200);
});

Template.profile.events({
  'submit #profileForm'(event) {
    event.preventDefault();
    const profile = $('#profileForm').form('get values');
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { profile } }, (error) => {
      if (error) {
        $('body').toast({
          class: 'error',
          message: error.message,
        });
      } else {
        $('body').toast({
          class: 'success',
          message: 'Profile saved',
        });
      }
    });
  },
});
