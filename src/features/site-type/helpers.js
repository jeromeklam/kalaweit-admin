import React from 'react';
import { AddOne as AddOneIcon, GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';

export const getGlobalActions = ({ props, onCreate }) => {
  return [
    {
      name: 'create',
      label: props.intl.formatMessage({ id: 'app.list.button.add', defaultMessage: 'Add' }),
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({ props, onGetOne, onDelOne }) => {
  return [
    {
      name: 'modify',
      label: props.intl.formatMessage({ id: 'app.list.button.modify', defaultMessage: 'Modify' }),
      onClick: onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: props.intl.formatMessage({ id: 'app.list.button.delete', defaultMessage: 'Delete' }),
      onClick: onDelOne,
      theme: 'warning',
      icon: <DelOneIcon color="white" />,
      role: 'DELETE',
    },
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'name',
      label: props.intl.formatMessage({ id: 'app.features.siteType.list.col.name', defaultMessage: 'Name' }),
      col: 'sitt_name',
      size: '30',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      first: true,
    },
  ];
};
