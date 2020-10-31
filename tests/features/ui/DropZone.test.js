import React from 'react';
import { shallow } from 'enzyme';
import { DropZone } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DropZone />);
  expect(renderedComponent.find('.ui-drop-zone').length).toBe(1);
});
