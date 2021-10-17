import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UserArchivingComponent extends Component {
  @action toggleArchived() {
    const { user } = this.args;

    user.toggleArchived();
    user.save();
  }
}
