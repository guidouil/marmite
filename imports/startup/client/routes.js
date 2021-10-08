import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// Import needed layouts templates
import '../../ui/layouts/default/default.js';

// Import needed pages templates
import '../../ui/pages/home/home.js';
import '../../ui/pages/help/help.js';
import '../../ui/pages/terms/terms.js';

import '../../ui/pages/user/create/create.js';
import '../../ui/pages/user/emailValidator/emailValidator.js';
import '../../ui/pages/user/forgot/forgot.js';
import '../../ui/pages/user/login/login.js';
import '../../ui/pages/user/newPassword/newPassword.js';
import '../../ui/pages/user/profile/profile.js';
import '../../ui/pages/user/verifyEmail/verifyEmail.js';

import '../../ui/pages/not-found/not-found.js';

const ensureSignedIn = () => {
  if (!Meteor.userId()) {
    FlowRouter.go('/user/login');
  }
  const user = Meteor.user();
  if (user && !user.emails[0].verified) {
    FlowRouter.go('/user/validate-email');
  }
  return true;
};

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    this.render('default', 'home');
  },
});

FlowRouter.route('/help', {
  name: 'help',
  action() {
    this.render('default', 'help');
  },
});

FlowRouter.route('/terms', {
  name: 'terms',
  action() {
    this.render('default', 'terms');
  },
});

FlowRouter.route('/user/login', {
  name: 'login',
  action() {
    this.render('default', 'login');
  },
});

FlowRouter.route('/user/create', {
  name: 'create',
  action() {
    this.render('default', 'create');
  },
});

FlowRouter.route('/user/forgot', {
  name: 'forgot',
  action() {
    this.render('default', 'forgot');
  },
});

FlowRouter.route('/user/validate-email', {
  name: 'emailValidator',
  triggersEnter: [ensureSignedIn],
  action() {
    this.render('default', 'emailValidator');
  },
});

FlowRouter.route('/user/profile', {
  name: 'profile',
  triggersEnter: [ensureSignedIn],
  action() {
    this.render('default', 'profile');
  },
});

FlowRouter.route('/enroll-account/:token', {
  name: 'newPassword',
  action() {
    this.render('default', 'newPassword');
  },
});

FlowRouter.route('/reset-password/:token', {
  name: 'newPassword',
  action() {
    this.render('default', 'newPassword');
  },
});

FlowRouter.route('/verify-email/:token', {
  name: 'verifyEmail',
  triggersEnter: [ensureSignedIn],
  action() {
    this.render('default', 'verifyEmail');
  },
});

FlowRouter.route('*', {
  name: 'notFound',
  action() {
    this.render('default', 'notFound');
  },
});
