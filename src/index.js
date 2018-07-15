import { shallow, mount, render } from 'enzyme';
import forEachProjectVariation from 'react-component-variations/traversal/forEachProjectVariation';
import React from 'react';

export default function reactComponentVariationsConsumerEnzyme(defineTests, {
  projectRoot = undefined,
  selectProjectNames = undefined,
  getExtras = undefined,
} = {}) {
  if (typeof defineTests !== 'function') {
    throw new TypeError('first argument must be a function, that defines your test assertion types');
  }
  if (defineTests.length < 2) {
    throw new TypeError('your defineTests callback must accept at least 2 arguments: Component `name`, and an object containing the variation `title`, and a synchronous function that you can use to provide `validTest` and `noThrowTest` callbacks');
  }

  forEachProjectVariation('enzyme', {
    projectRoot,
    selectProjectNames,
    getExtras,
  })(({
    componentName,
    title,
    render: renderVariation,
    options: {
      shallow: useShallow = true,
      mount: useMount = true,
      render: useRender = true,
    },
  }) => {
    defineTests(componentName, {
      title,
      validTest(callback) {
        callback('is a valid element', () => React.isValidElement(renderVariation()));
      },
      noThrowTest(callback) {
        if (useShallow) {
          callback('shallow renders', () => shallow(renderVariation()));
        }
        if (useMount) {
          callback('mounts', () => mount(renderVariation()), true);
        }
        if (useRender) {
          callback('statically renders', () => render(renderVariation()));
        }
      },
    });
  });
}
/*
 it('is a valid element', () => {
          expect(React.isValidElement(exampleElement)).to.equal(true);
        });

        it('shallow renders', () => {
          expect(() => shallow(exampleElement)).not.to.throw();
        });

        it('static renders', () => {
          expect(() => staticRender(exampleElement)).not.to.throw();
        });
        */
