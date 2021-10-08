import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';

import { Conf } from '/imports/api/conf/conf';

import './footer.html';

Template.footer.onRendered(() => {
  // enforce dark mode
  Tracker.afterFlush(() => {
    const conf = Conf.findOne({ _id: 'me' });
    if (!conf) {
      Conf.insert({ _id: 'me', darkMode: true });
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && conf && !conf.darkMode) {
      Conf.update({ _id: 'me' }, { $set: { darkMode: true } });
    }
  });
});

Template.footer.helpers({
  year() {
    const today = new Date();
    return today.getFullYear();
  },
  darkModeIcon() {
    const conf = Conf.findOne({ _id: 'me' });
    return conf && conf.darkMode ? 'sun' : 'moon';
  },
});

Template.footer.events({
  'click #love'() {
    $('#love').transition('pulse').transition('pulse');
  },
  'click #darkMode'() {
    const conf = Conf.findOne({ _id: 'me' });
    const darkMode = (conf && conf.darkMode) || false;
    Conf.upsert({ _id: 'me' }, { $set: { darkMode: !darkMode } });
  },
});
