import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { loadSponsorships } from '../sponsorship/redux/actions';
import { loadDonations } from '../donation/redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveQuickSearch } from 'react-bootstrap-front';
import {
  Search as SearchIcon,
} from '../icons';
import { showErrors, deleteSuccess, List as UiList } from '../ui';
import { getGlobalActions, getInlineActions, getCols } from './';
import { Create, Modify } from './';
import { InlineSponsorships } from '../sponsorship';
import { InlineDonations } from '../donation';

export class List extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      cliId: -1,
      mode: null,
      item: null,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSelectList = this.onSelectList.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ cliId: 0 });
  }

  onGetOne(id) {
    this.setState({ cliId: id });
  }

  onClose() {
    this.setState({ cliId: -1 });
  }

  onDelOne(id) {
    this.props.actions
      .delOne(id)
      .then(result => {
        deleteSuccess();
        this.props.actions.loadMore({}, true)
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  onReload(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.actions.loadMore({}, true);
  }

  onLoadMore(event) {
    this.props.actions.loadMore();
  }

  onQuickSearch(quickSearch) {
    this.props.actions.updateQuickSearch(quickSearch);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, this.props.loadTimeOut);
    this.setState({ timer: timer });
  }

  onUpdateSort(col, way, pos = 99) {
    this.props.actions.updateSort(col.col, way, pos);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, this.props.loadTimeOut);
    this.setState({ timer: timer });
  }

  onSetFiltersAndSort(filters, sort) {
    this.props.actions.setFilters(filters);
    this.props.actions.setSort(sort);
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, this.props.loadTimeOut);
    this.setState({ timer: timer });
  }

  onClearFilters() {
    this.props.actions.initFilters();
    this.props.actions.initSort();
    let timer = this.state.timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.props.actions.loadMore({}, true);
    }, this.props.loadTimeOut);
    this.setState({ timer: timer });
  }

  onSelectList(obj, list) {
    if (obj) {
      if (list) {
        this.setState({ mode: list, item: obj });
      } else {
        this.setState({ item: obj });
      }
    } else {
      this.setState({ mode: false, item: null });
    }
  }

  render() {
    const { intl } = this.props;
    // Les des items à afficher avec remplissage progressif
    let items = [];
    if (this.props.client.items.FreeAsso_Client) {
      items = normalizedObjectModeler(this.props.client.items, 'FreeAsso_Client');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);
    // L'affichage, items, loading, loadMoreError
    let search = '';
    const crit = this.props.client.filters.findFirst('cli_firstname');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label={intl.formatMessage({ id: 'app.features.client.list.search', defaultMessage: 'Search by first name, last name or email' })}
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    let inlineComponent = null;
    switch (this.state.mode) {
      case 'donation':
        inlineComponent = <InlineDonations mode="client" id={this.state.item.id} />
        break;
      case 'sponsorship':
        inlineComponent = <InlineSponsorships mode="client" id={this.state.item.id} />
        break;
      default: 
        inlineComponent = null;
        break;
    }
    return (
      <div>
        <UiList
          title={intl.formatMessage({ id: 'app.features.client.list.title', defaultMessage: 'Members' })}
          intl={intl}
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="cli_firstname"
          inlineActions={inlineActions}
          currentItem={this.state.item}
          inlineComponent={inlineComponent}
          globalActions={globalActions}
          sort={this.props.client.sort}
          filters={this.props.client.filters}
          onSearch={this.onQuickSearch}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onClearFilters={this.onClearFilters}
          onLoadMore={this.onLoadMore}
          onClick={this.onSelectList}
          loadMorePending={this.props.client.loadMorePending}
          loadMoreFinish={this.props.client.loadMoreFinish}
          loadMoreError={this.props.client.loadMoreError}
        />
        {this.state.cliId > 0 && (
          <Modify modal={true} cliId={this.state.cliId} onClose={this.onClose} />
        )}
        {this.state.cliId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadTimeOut: state.auth.loadTimeOut,
    client: state.client,
    clientCategory: state.clientCategory,
    sponsorship: state.sponsorships,
    donation: state.donations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, loadSponsorships, loadDonations }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
