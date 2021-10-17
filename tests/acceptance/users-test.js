import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | users', function (hooks) {
  setupApplicationTest(hooks);

  const userCardSelector = '[data-test-user-card]';

  test('user archiving', async function (assert) {
    await visit('/users');

    assert.equal(currentURL(), '/users');
    assert
      .dom(userCardSelector)
      .exists({ count: 4 }, 'all users are initially displayed');

    await click(userCardSelector);
    await click('[data-test-button="archive"]');

    assert
      .dom('[data-test-message="archived"]')
      .exists('archived message is displayed after archiving an user');

    await click('[data-test-button="backToUsers"]');

    assert
      .dom(userCardSelector)
      .exists({ count: 3 }, 'archived user is not displayed');

    await click('[data-test-button="toggleShowArchivedUsers"]');

    assert
      .dom(userCardSelector)
      .exists({ count: 4 }, 'all users are displayed');
    assert
      .dom('[data-test-tag="archived"]')
      .exists('archived tag is displayed');
  });
});
