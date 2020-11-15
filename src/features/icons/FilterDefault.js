import React from 'react';
import { mdiFilterPlusOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function FilterDefault(props) {
  return <Icon path={myIcon} {...props} />;
};
