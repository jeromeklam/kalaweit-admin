import React from 'react';
import { shallow } from 'enzyme';
import { DashboardCardStat } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DashboardCardStat />);
  expect(renderedComponent.find('.dashboard-dashboard-card-stat').length).toBe(1);
});
