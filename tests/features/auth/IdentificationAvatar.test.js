import React from 'react';
import { shallow } from 'enzyme';
import { IdentificationAvatar } from '../../../src/features/auth';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<IdentificationAvatar />);
  expect(renderedComponent.find('.auth-identification-avatar').length).toBe(1);
});
