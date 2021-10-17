import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-archiving', function (hooks) {
  setupRenderingTest(hooks);

  const archiveButtonSelector = '[data-test-button="archive"]';
  const archivedMessageSelector = '[data-test-message="archived"]';

  test('it renders unarchived user', async function (assert) {
    this.set('user', { archived: false });
    await render(hbs`<UserArchiving @user={{this.user}} />`);

    assert.dom(archiveButtonSelector).hasText('Archive user');
    assert.dom(archivedMessageSelector).doesNotExist();
  });

  test('it renders archived user', async function (assert) {
    this.set('user', { archived: true });
    await render(hbs`<UserArchiving @user={{this.user}} />`);

    assert.dom(archiveButtonSelector).hasText('Unarchive user');
    assert.dom(archivedMessageSelector).exists();
  });

  test('it toggles a user', async function (assert) {
    assert.expect(2);

    this.set('user', {
      archived: false,
      toggleArchived() {
        assert.ok(true, 'toggleArchived is called');
      },
      save() {
        assert.ok(true, 'user is saved');
      },
    });

    await render(hbs`<UserArchiving @user={{this.user}} />`);

    await click(archiveButtonSelector);
  });
});
