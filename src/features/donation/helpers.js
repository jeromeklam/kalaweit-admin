import React from 'react';
import { isEmptyText } from 'react-bootstrap-front';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  PaymentOn as PaymentOnIcon,
  PaymentOff as PaymentOffIcon,
  Note as NoteIcon,
  Sponsorship as SponsorshipIcon,
  View as ViewOneIcon,
} from '../icons';

export const getStatus = ( intl ) => {
  let statusValues = [
    { value: 'WAIT', label: intl.formatMessage({ id: 'app.features.donation.status.wait', defaultMessage: 'Waiting' }) },
    { value: 'OK', label: intl.formatMessage({ id: 'app.features.donation.status.paid', defaultMessage: 'Paid' }) },
    { value: 'NOK', label: intl.formatMessage({ id: 'app.features.donation.status.unpaid', defaultMessage: 'Unpaid' }) },
    //{ value: 'NEXT', label: 'A venir' },
  ];
  return statusValues;
}

const missionDisplay = (item) => {
  let result = item.cause.cau_name;
  if (item.sponsorship && item.sponsorship.id > 0) {
    return <span className="text-secondary">{result} <SponsorshipIcon size={0.6}/></span>
  }
  return result;
}

export const getGlobalActions = ({ props, onClearFilters, onCreate }) => {
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

export const getInlineActions = ({ props, onGetOne, onDelOne, onPayOn, onPayOff }) => {
  return [
    {
      name: 'status',
      label: props.intl.formatMessage({ id: 'app.list.button.paid', defaultMessage: 'Paid' }),
      onClick: onPayOn,
      theme: 'secondary',
      icon: <PaymentOnIcon color="white" />,
      role: 'OTHER',
      fDisplay: item => {
        if (item.don_status === 'NOK' || item.don_status === 'WAIT') {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      name: 'status',
      label: props.intl.formatMessage({ id: 'app.list.button.unpaid', defaultMessage: 'Unpaid' }),
      onClick: onPayOff,
      theme: 'secondary',
      icon: <PaymentOffIcon color="white" />,
      role: 'OTHER',
      fDisplay: item => {
        if (item.don_status === 'OK' || item.don_status === 'WAIT') {
          return true;
        } else {
          return false;
        }
      },
    },
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
      fDisplay: (item) => {return (item && item.session && item.session.sess_status !== 'CLOSED');}
    },
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'id',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.id',
        defaultMessage: 'Id.',
      }),
      col: 'id',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      hidden: true,
    },
    {
      name: 'lastname',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.lastname',
        defaultMessage: 'Lastname',
      }),
      col: 'client.cli_lastname',
      size: '5',
      mob_size: '',
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'firstame',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.firstname',
        defaultMessage: 'Firstname',
      }),
      col: 'client.cli_firstname',
      size: '4',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'date',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.realTs',
        defaultMessage: 'Done on',
      }),
      col: 'don_real_ts',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'mnt',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.mnt',
        defaultMessage: 'Amount',
      }),
      col: 'don_mnt_input',
      size: '3',
      mob_size: '',
      sortable: true,
      type: 'monetary',
      col_money: 'don_money_input',
      filterable: { type: 'text' },
    },
    {
      name: 'status',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.status',
        defaultMessage: 'Status',
      }),
      col: 'don_status',
      size: '3',
      mob_size: '',
      sortable: true,
      type: 'switch',
      value: getStatus(props.intl),
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.type',
        defaultMessage: 'Type',
      }),
      col: 'payment_type.ptyp_name',
      size: '4',
      mob_size: '',
      sortable: true,
      type: 'text',
      filterable: { type: 'text' },
    },
    {
      name: 'name',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.cause',
        defaultMessage: 'Mission',
      }),
      col: 'cause.cau_name',
      size: '6',
      mob_size: '',
      fDisplay: missionDisplay,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'note',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.comments',
        defaultMessage: 'Comments',
      }),
      col: 'don_comment',
      size: '7',
      mob_size: '',
      sortable: true,
      fDisplay: item => {
        if (!isEmptyText(item.don_comment)) {
          return <NoteIcon className="col-icon" />;
        } else {
          return '';
        }
      },
      last: true,
    },
  ];
};
