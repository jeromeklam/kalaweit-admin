import React from 'react';
import { mdiStopCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Stop(props) {
  return (
    <Icon path={myIcon} {...props} />
  );
};