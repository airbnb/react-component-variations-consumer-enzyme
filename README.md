# react-component-variations-consumer-enzyme
enzyme consumer for react-component-variations

## Example using jest:
```jsx
import React from 'react';
import { expect } from 'chai';
import { render as staticRender, shallow } from 'enzyme';
import wrap from 'jest-wrap';
import forEachVariation from 'react-component-variations/traversal/forEachVariation';

import fixtures from '../variations/fixtures'; // fixture data

const action = () => () => {}; // used by storybook

// a jest-wrap plugin (usually this would be in its own module)
const isDOM = typeof window !== 'undefined';
function withDOM() {
  return isDOM
    ? this.extend('with DOM', {})
    : this.extend('without DOM', {}).skip();
}

import enzymeTests from 'react-component-variations-consumer-enzyme';

enzymeTests((name, { title, validTest, noThrowTest }) => {
  describe(`<${name}> ${title}`, () => {
    validTest((description, testFn) => {
      it(description, () => {
        expect(testFn()).to.equal(true);
      });
    });

    noThrowTest((description, testFn, requiresDOM = false) => {
      if (requiresDOM) {
        wrap().use(withDOM).it(description, () => {
          expect(() => testFn()).not.to.throw();
        });
      } else {
        it(description, () => {
          expect(() => testFn()).not.to.throw();
        });
      }
    });
  });
}, {
  getExtras() { return { action, fixtures }; },
});
```
