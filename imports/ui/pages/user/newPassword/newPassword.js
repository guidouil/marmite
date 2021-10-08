import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './newPassword.html';
import '../../../components/logo/logo.js';

Template.newPassword.onCreated(() => {
  document.title = 'Focus - new password';
});

Template.newPassword.onRendered(() => {
  $('#newPasswordForm').form({
    fields: {
      password: ['minLength[6]'],
      passwordConfirmation: ['minLength[6]', 'match[password]'],
    },
  });
});

Template.newPassword.events({
  'submit #newPasswordForm'(event) {
    event.preventDefault();
    const token = FlowRouter.getParam('token');
    const { password } = $('#newPasswordForm').form('get values');
    if (token && password) {
      Accounts.resetPassword(token, password, (error) => {
        if (error) {
          $('body').toast({
            class: 'error',
            message: error.message,
          });
        } else {
          $('body').toast({
            class: 'success',
            message: 'Password reseted',
          });
          FlowRouter.go('/user/profile');
        }
      });
    }
  },
});
