import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Sponsorship as SponsorshipIcon,
  Donation as DonationIcon,
} from '../icons';
import { clientCategoryAsOptions } from '../client-category';

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

export const getInlineActions = ({ props, onSelectList, onGetOne, onDelOne, state }) => {
  return [
    {
      name: 'donation',
      label: props.intl.formatMessage({
        id: 'app.list.button.donations',
        defaultMessage: 'Donations',
      }),
      param: 'object',
      onClick: obj => {
        onSelectList(obj, 'donation');
      },
      theme: 'secondary',
      icon: <DonationIcon color="white" />,
      active: state.donations > 0,
    },
    {
      name: 'sponsorship',
      label: props.intl.formatMessage({
        id: 'app.list.button.sponsorships',
        defaultMessage: 'Sponsorships',
      }),
      param: 'object',
      onClick: obj => {
        onSelectList(obj, 'sponsorship');
      },
      theme: 'secondary',
      icon: <SponsorshipIcon color="white" />,
      active: state.sponsorships > 0,
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
      label: props.intl.formatMessage({ id: 'app.list.button.del', defaultMessage: 'Delete' }),
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
      name: 'id',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.id',
        defaultMessage: 'Number',
      }),
      col: 'id',
      size: { xl: 3, lg: 4 },
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      first: true,
      card: { role: 'ID' },
    },
    {
      name: 'category',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.category',
        defaultMessage: 'Category',
      }),
      col: 'client_category.clic_name',
      size: { xl: 4, lg: 5 },
      title: true,
      sortable: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'lastname',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.lastname',
        defaultMessage: 'Lastname',
      }),
      col: 'cli_lastname',
      size: { xl: 4, lg: 5 },
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'firstname',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.firstname',
        defaultMessage: 'Firstname',
      }),
      col: 'cli_firstname',
      size: { xl: 4, lg: 4 },
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'fullname',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.fullname',
        defaultMessage: 'Fullname',
      }),
      col: 'cli_fullname',
      fDisplay: item => {
        return (
          (item.cli_lastname ? item.cli_lastname : '') +
          ' ' +
          (item.cli_firstname ? item.cli_firstname : '')
        );
      },
      hidden: true,
      sortable: false,
      filterable: false,
      title: false,
      card: { role: 'TITLE' },
    },
    {
      name: 'town',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.town',
        defaultMessage: 'Town',
      }),
      col: 'cli_town',
      size: { xl: 5, lg: 8 },
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: { lg: true },
      title: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'country',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.country',
        defaultMessage: 'Country',
      }),
      col: 'country.cnty_name',
      size: { xl: 4, lg: 8 },
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: { lg: true },
      title: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'email',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.email',
        defaultMessage: 'Email',
      }),
      col: 'cli_email',
      size: { xl: 7, lg: 15 },
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      card: { role: 'FIELD' },
    },
    {
      name: 'last_donation',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.lastDonation',
        defaultMessage: 'Last donation',
      }),
      col: 'last_donation.don_ts',
      size: { xl: 4, lg: 10 },
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      type: 'date',
      last: true,
    },
    {
      name: 'receipt',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.cliReceipt',
        defaultMessage: 'Send receipt',
      }),
      col: 'cli_receipt',
      hidden: true,
      sortable: false,
      filterable: { type: 'bool' },
      type: 'bool',
    },
    {
      name: 'cli_email_refused',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.cliEmailRefused',
        defaultMessage: 'Email refused',
      }),
      col: 'cli_email_refused',
      hidden: true,
      sortable: false,
      filterable: { type: 'text' },
      type: 'text',
    },
    {
      name: 'category',
      label: props.intl.formatMessage({
        id: 'app.features.client.list.col.category',
        defaultMessage: 'Category',
      }),
      col: 'client_category.clic_id',
      size: '0',
      mob_size: '0',
      sortable: false,
      filterable: {
        type: 'select',
        options: clientCategoryAsOptions(props.clientCategory.items),
      },
      title: true,
      hidden: true,
      last: true,
    },
  ];
};
