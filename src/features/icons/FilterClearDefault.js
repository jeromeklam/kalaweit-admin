import React from 'react';
import { mdiFilterMinusOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function FilterClearDefault(props) {
  return <Icon path={myIcon} {...props} />;
};
