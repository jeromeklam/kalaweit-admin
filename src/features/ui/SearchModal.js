import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ResponsiveModal, FILTER_OPER_LIKE, FILTER_MODE_AND } from 'react-bootstrap-front';
import { CenteredLoading3Dots } from './';

class SearchModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array,
    pickerDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    filters: PropTypes.array,
  };
  static defaultProps = {
    list: [],
    pickerDisplay: '',
  };

  static getDerivedStateFromProps(props, state) {
    state.fields.forEach(field => {
      const found = props.filters.find(filter => filter.name === field.name);
      if (found) {
        if (found.value !== field.origin) {
          field.origin = found.value;
          field.value = found.value;
        }
      }
    });
    return false;
  }

  constructor(props) {
    super(props);
    let filters = this.props.filters;
    filters.forEach(item => {
      item.origin = item.value || '';
      item.value = item.value || '';
    });
    this.state = {
      fields: filters,
      condition: FILTER_MODE_AND,
    };
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    let load = false;
    this.state.fields.forEach(item => {
      if (item.filtered) {
        load = true;
      }
    });
    if (load) {
      this.onSearch();
    }
  }

  onChange(event) {
    let filters = this.state.fields;
    filters.forEach(item => {
      if (item.name === event.target.name) {
        item.value = event.target.value;
      }
    });
    this.setState({ fields: filters });
  }

  onClear(event) {
    let filters = this.state.fields;
    filters.forEach(item => {
      item.value = '';
    });
    this.setState({ fields: filters });
    this.props.onClear();
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearch(event);
    }
  }

  onSearch(event) {
    let params = false;
    this.state.fields.forEach(item => {
      if (item.filtered) {
        if (params === false) {
          params = { filter: { [this.state.condition]: {} } };
        }
        let values = [];
        item.options.forEach(elem => {
          values.push(elem.value);
        });
        params.filter[this.state.condition][item.name] = { [FILTER_OPER_LIKE]: values };
      } else {
        if (item.value !== '') {
          if (params === false) {
            params = { filter: { [this.state.condition]: {} } };
          }
          params.filter[this.state.condition][item.name] = { [FILTER_OPER_LIKE]: item.value };
        }
      }
    });
    const filters = params || {};
    this.props.onSearch(filters);
  }

  render() {
    const buttons = [
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.filter',
          defaultMessage: 'Filter',
        }),
        function: this.onSearch,
        theme: 'primary',
        icon: 'filter',
      },
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.delete',
          defaultMessage: 'Delete',
        }),
        function: this.onClear,
        theme: 'warning',
        icon: 'delete',
      },
      {
        name: this.props.intl.formatMessage({
          id: 'app.features.ui.searchModal.cancel',
          defaultMessage: 'Cancel',
        }),
        function: this.props.onClose,
        theme: 'secondary',
        icon: 'close',
      },

      ('app.features.ui.searchModal.delete': 'Effacer'),
      ('app.features.ui.searchModal.cancel': 'Annuler'),
    ];
    const searchArea = (
      <div onKeyUp={this.handleKeyUp}>
        <h6 className="text-secondary">Critères de recherche :</h6>
        <div className="search-filters row">
          {this.state.fields &&
            this.state.fields.map((item, i) => {
              if (item.filtered) {
                return null;
              }
              if (item.type === 'select') {
                return (
                  <div
                    className={classnames('col-sm-' + (item.size || '18'))}
                    key={`${item.name}-${i}`}
                  >
                    <select
                      className="form-control"
                      value={item.value}
                      name={item.name}
                      placeholder={item.label}
                      onChange={this.onChange}
                    >
                      <option value="">{item.label}</option>
                      {item.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                return (
                  <div className="col-sm-w18" key={`${item.name}-${i}`}>
                    <input
                      className="form-control"
                      value={item.value}
                      name={item.name}
                      placeholder={item.label}
                      type="text"
                      onChange={this.onChange}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    );
    return (
      <ResponsiveModal
        size="lg"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
        buttons={buttons}
        header={searchArea}
        height="400px"
        modalClassName="bg-primary-light text-primary"
        closeClassName="text-primary"
      >
        <div className="search-modal">
          <div className="search-results pt-2">
            {this.props.loading ? (
              <CenteredLoading3Dots />
            ) : (
              <div>
                <h6 className="text-secondary">Résultats :</h6>
                <ul className="list-group">
                  {this.props.list &&
                    this.props.list.map(item => {
                      return (
                        <li
                          key={item.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            this.props.onSelect(item);
                          }}
                        >
                          <p>
                            {typeof this.props.pickerDisplay === 'function' ? (
                              <span />
                            ) : (
                              <div>
                                {this.props.pickerDisplay.split(',').map((elem, i) => (
                                  <span className="mr-2" key={`key-${i}`}>
                                    {item[elem] ? item[elem] : elem}
                                  </span>
                                ))}
                              </div>
                            )}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </ResponsiveModal>
    );
  }
}

export default injectIntl(SearchModal);
