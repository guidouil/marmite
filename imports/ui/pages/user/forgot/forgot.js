import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import './forgot.html';
import '../../../components/logo/logo.js';

Template.forgot.onCreated(() => {
  const instance = Template.instance();
  instance.sent = new ReactiveVar(false);
});

Template.forgot.onRendered(() => {
  $('#forgotForm').form({
    fields: {
      email: ['email'],
    },
  });
});

Template.forgot.helpers({
  sent() {
    return Template.instance().sent.get();
  },
});

Template.forgot.events({
  'submit #forgotForm'(event, templateInstance) {
    event.preventDefault();
    const { email } = $('#forgotForm').form('get values');
    if (email) {
      Accounts.forgotPassword({ email }, (error) => {
        if (error) {
          $('body').toast({
            class: 'error',
            message: error.message,
          });
        } else {
          $('body').toast({
            class: 'success',
            message: 'Please check your inbox to reset your password',
          });
          templateInstance.sent.set(true);
        }
      });
    }
  },
});
