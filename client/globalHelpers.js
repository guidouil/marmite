import { Template } from 'meteor/templating';
import { Conf } from '/imports/api/conf/conf';

Template.registerHelper('isDark', (color) => {
  const conf = Conf.findOne({ _id: 'me' });
  if (conf && conf.darkMode === true) {
    return 'inverted' || color;
  }
  return '';
});
