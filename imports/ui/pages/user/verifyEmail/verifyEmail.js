import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { $ } from 'meteor/jquery';

import './verifyEmail.html';
import '../../../components/logo/logo.js';

Template.verifyEmail.onRendered(() => {
  const token = FlowRouter.getParam('token');
  Accounts.verifyEmail(token, (error) => {
    if (error) {
      $('body').toast({
        class: 'error',
        message: error.message,
      });
    } else {
      $('body').toast({
        class: 'success',
        message: 'Email verified',
      });
      FlowRouter.go('/user/profile');
    }
  });
});
