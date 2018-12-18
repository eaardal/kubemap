// const context = require.context('./', true, /\.spec\.js?$/);
// context.keys().forEach(context);

import { add } from 'utils/node.util';
import { expect } from 'chai';

describe('nodeutil', () => {
  it('should add 1+1', () => {
    expect(add(1)).to.equal(2);
  });
});
