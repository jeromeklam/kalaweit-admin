import React from 'react';
import { mdiMonitorClean as myIcon } from '@mdi/js';
import { Icon } from './';

export default function DashboardReset(props) {
  return <Icon path={myIcon} {...props} />;
};