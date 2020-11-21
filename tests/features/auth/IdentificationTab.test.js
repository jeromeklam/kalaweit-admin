import React from 'react';
import { shallow } from 'enzyme';
import { IdentificationTab } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<IdentificationTab />);
  expect(renderedComponent.find('.auth-identification-tab').length).toBe(1);
});
