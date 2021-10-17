import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-archiving', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders unarchived user', async function (assert) {
    this.set('user', { archived: false });
    await render(hbs`<UserArchiving @user={{this.user}} />`);

    assert.dom('[data-testid="archive-button"]').hasText('Archive user');
    assert.dom('[data-testid="archived-message"').doesNotExist();
  });

  test('it renders archived user', async function (assert) {
    this.set('user', { archived: true });
    await render(hbs`<UserArchiving @user={{this.user}} />`);

    assert.dom('[data-testid="archive-button"]').hasText('Unarchive user');
    assert.dom('[data-testid="archived-message"').exists();
  });

  test('it can toggle a user', async function (assert) {
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

    await click('[data-testid="archive-button"]');
  });
});
