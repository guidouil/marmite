import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sendVerificationEmail() {
    const userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error(403, 'You must be connected');
    }
    return Accounts.sendVerificationEmail(userId);
  },
  deleteMyAccount() {
    const userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error(401, 'You must be connected');
    }
    return Meteor.users.remove({ _id: userId });
  },
});
