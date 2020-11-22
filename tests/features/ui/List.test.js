import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<List />);
  expect(renderedComponent.find('.ui-list').length).toBe(1);
});
