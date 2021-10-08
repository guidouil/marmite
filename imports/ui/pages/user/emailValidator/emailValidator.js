import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';

import './emailValidator.html';
import '../../../components/logo/logo.js';

Template.emailValidator.onCreated(() => {
  const instance = Template.instance();
  instance.sent = new ReactiveVar(false);
});

Template.emailValidator.onRendered(() => {
  const instance = Template.instance();
  instance.autorun(() => {
    const user = Meteor.user();
    if (user && user.emails[0].verified) {
      FlowRouter.go('/user/profile');
    }
  });
});

Template.emailValidator.helpers({
  sent() {
    return Template.instance().sent.get();
  },
});

Template.emailValidator.events({
  'click #sendVerifyButton'(event, templateInstance) {
    $('#sendVerifyButton').addClass('loading');
    Meteor.call('sendVerificationEmail', (error) => {
      if (error) {
        $('body').toast({
          class: 'error',
          message: error.message,
        });
      } else {
        $('body').toast({
          class: 'success',
          message: 'Please check your inbox and other folders',
        });
        templateInstance.sent.set(true);
      }
      $('#sendVerifyButton').removeClass('loading');
    });
  },
  'click #deleteAccountButton'() {
    Meteor.call('deleteMyAccount', (error) => {
      if (error) {
        $('body').toast({
          class: 'error',
          message: error.message,
        });
      }
      FlowRouter.go('/user/create');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });
  },
});
