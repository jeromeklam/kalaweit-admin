import React from 'react';
import { mdiFilterMenuOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function FilterEmpty(props) {
  return <Icon path={myIcon} {...props} />;
};
