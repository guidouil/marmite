import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './header.html';
import '../logo/logo.js';

Template.header.helpers({
  isActive(routeName) {
    return FlowRouter.getRouteName() === routeName ? 'active' : '';
  },
  initDropdown() {
    Meteor.setTimeout(() => {
      $('#headerMenu').dropdown({
        onShow() {
          $('#headerMenuIcon').toggleClass('hamburger').toggleClass('close');
        },
        onHide() {
          $('#headerMenuIcon').toggleClass('hamburger').toggleClass('close');
        },
      });
    }, 500);
  },
  isHome() {
    return FlowRouter.getRouteName() === 'home';
  },
});

Template.header.events({
  'click #sendVerifyButton'() {
    Meteor.call('sendVerificationEmail', (error) => {
      if (error) {
        $('body').toast({
          class: 'error',
          message: error.message,
        });
      } else {
        $('body').toast({
          class: 'success',
          message: 'Please check your inbox, spam and other folders',
        });
      }
    });
  },
  'click #logoutButton'() {
    Meteor.logout((error) => {
      if (error) {
        $('body').toast({
          class: 'error',
          message: error.message,
        });
      } else {
        FlowRouter.go('/');
      }
    });
  },
  'click #goBack'() {
    window.history.back();
  },
});
