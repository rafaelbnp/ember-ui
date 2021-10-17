import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | users/index', function (hooks) {
  setupTest(hooks);

  test('it toggles showArchivedUsers', function (assert) {
    const controller = this.owner.lookup('controller:users/index');

    assert.notOk(
      controller.showArchivedUsers,
      'showArchivedUsers is initially false'
    );

    controller.toggleShowArchivedUsers();

    assert.ok(
      controller.showArchivedUsers,
      'showArchivedUsers is toggled to true'
    );
  });

  test('it can filter archived users', function (assert) {
    const controller = this.owner.lookup('controller:users/index');

    controller.model = [{ archived: false }, { archived: true }];

    assert.equal(controller.users.length, 1);

    controller.showArchivedUsers = true;
    assert.equal(controller.users.length, 2);
  });
});
