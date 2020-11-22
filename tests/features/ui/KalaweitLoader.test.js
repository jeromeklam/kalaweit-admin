import React from 'react';
import { shallow } from 'enzyme';
import { KalaweitLoader } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<KalaweitLoader />);
  expect(renderedComponent.find('.ui-kalaweit-loader').length).toBe(1);
});
