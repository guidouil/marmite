import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './create.html';
import '../../../components/logo/logo.js';

Template.create.onRendered(() => {
  $('#createForm').form({
    fields: {
      firstname: ['empty'],
      lastname: ['empty'],
      email: ['email'],
      password: ['minLength[6]'],
    },
  });
});

Template.create.events({
  'submit #createForm'(event) {
    event.preventDefault();
    const { email, password, firstname, lastname } = $('#createForm').form('get values');
    if (email.indexOf('yopmail') !== -1) {
      $('body').toast({
        class: 'error',
        message: 'YOPMAIL not allowd',
      });
      return false;
    }
    if (email && password && firstname && lastname) {
      const profile = { firstname, lastname };
      Accounts.createUser({ email, password, profile }, (error) => {
        if (error) {
          $('body').toast({
            class: 'error',
            message: error.message,
          });
        } else {
          FlowRouter.go('/user/validate-email');
        }
      });
    }
    return true;
  },
});
