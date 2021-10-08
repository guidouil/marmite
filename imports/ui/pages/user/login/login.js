import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';
import '../../../components/logo/logo.js';

Template.login.onCreated(() => {
  document.title = 'Focus - user login';
});

Template.login.onRendered(() => {
  $('#loginForm').form({
    fields: {
      email: ['email'],
      password: ['minLength[6]'],
    },
  });
});

Template.login.events({
  'submit #loginForm'(event) {
    event.preventDefault();
    const { email, password } = $('#loginForm').form('get values');
    if (email && password) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          $('body').toast({
            class: 'error',
            message: error.message,
          });
        } else {
          FlowRouter.go('/user/profile');
        }
      });
    }
  },
});
