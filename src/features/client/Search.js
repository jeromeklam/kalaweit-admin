import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchModal } from '../ui';
import { jsonApiNormalizer, normalizedObjectModeler, objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../common';

export default class Search extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: [],
      loading: false,
      finish: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onClear() {
    this.setState({ loading: false, finish: true, list: [] });
  }

  onSearch(filters) {
    if (!this.state.loading) {
      const addUrl = objectToQueryString(filters);
      const doRequest = freeAssoApi.get('/v1/asso/client' + addUrl, {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(
        result => {
          let items = [];
          if (result && result.data) {
            const lines = jsonApiNormalizer(result.data);
            items = normalizedObjectModeler(lines, 'FreeAsso_Client');
          }
          this.setState({ loading: false, finish: true, list: items });
        },
        err => {
          this.setState({ loading: false, finish: true, list: [] });
        },
      );
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const filters = [
      { name: 'cli_lastname', label: 'Nom', type: 'text', size: '18' },
      { name: 'cli_firstname', label: 'Prénom', type: 'text', size: '18' },
      { name: 'cli_email', label: 'Email', type: 'text', size: '36' },
    ];
    return (
      <SearchModal
        title={this.props.title}
        show={this.props.show}
        loading={this.state.loading}
        onClose={this.props.onClose}
        onClear={this.onClear}
        onSearch={this.onSearch}
        onSelect={this.props.onSelect}
        list={this.state.list}
        pickerDisplay="cli_lastname, ,cli_firstname, -- ,cli_email"
        filters={filters}
      />
    );
  }
}
