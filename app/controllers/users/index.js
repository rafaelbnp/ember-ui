import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UsersIndexController extends Controller {
  @tracked showArchivedUsers = false;

  get users() {
    const allUsers = this.model;

    if (!this.showArchivedUsers) {
      return allUsers.filter((user) => !user.archived);
    }

    return allUsers;
  }

  @action toggleShowArchivedUsers() {
    this.showArchivedUsers = !this.showArchivedUsers;
  }
}
