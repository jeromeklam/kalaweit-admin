import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { ResponsiveList, ResponsiveQuickSearch } from 'react-bootstrap-front';
import { propagateModel } from '../../common';
import {
  Filter as FilterIcon,
  FilterFull as FilterFullIcon,
  SimpleCancel as CancelPanelIcon,
  SimpleValid as ValidPanelIcon,
  SortDown as SortDownIcon,
  SortUp as SortUpIcon,
  Sort as SortNoneIcon,
  Search as SearchIcon,
  DelOne as ClearIcon,
  Calendar as CalendarIcon,
} from '../icons';
import { showErrors, deleteSuccess, modifySuccess } from '../ui';
import { getGlobalActions, getInlineActions, getCols, updateDonStatus } from './';
import { Create, Modify } from './';

export class List extends Component {
  static propTypes = {
    donation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      donId: -1,
    };
    this.onCreate = this.onCreate.bind(this);
    this.onReload = this.onReload.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
    this.onPayOn = this.onPayOn.bind(this);
    this.onPayOff = this.onPayOff.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.onQuickSearch = this.onQuickSearch.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onUpdateSort = this.onUpdateSort.bind(this);
    this.onSetFiltersAndSort = this.onSetFiltersAndSort.bind(this);
    this.itemClassName = this.itemClassName.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  onCreate(event) {
    this.setState({ donId: 0 });
  }

  onGetOne(id) {
    this.setState({ donId: id });
  }

  onPayOn(id) {
    updateDonStatus(id, 'OK')
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  onPayOff(id) {
    updateDonStatus(id, 'NOK')
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Donation', result);
      })
      .catch(errors => {
        showErrors(this.props.intl, errors);
      });
  }

  onClose() {
    this.setState({ donId: -1 });
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
    }, 2000);
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
    }, 2000);
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
    }, 2000);
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
    }, 2000);
    this.setState({ timer: timer });
  }

  itemClassName(item) {
    if (item) {
      if (item.don_status === 'NOK') {
        return 'row-line-warning';
      } else if (item.don_status === 'WAIT') {
        return 'row-line-info';
      }
    }
    return '';
  }

  render() {
    const { intl } = this.props;
    let items = false;
    if (this.props.donation.items.FreeAsso_Donation) {
      items = normalizedObjectModeler(this.props.donation.items, 'FreeAsso_Donation');
    }
    const globalActions = getGlobalActions(this);
    const inlineActions = getInlineActions(this);
    const cols = getCols(this);

    let search = '';
    const crit = this.props.donation.filters.findFirst('don_mnt');
    if (crit) {
      search = crit.getFilterCrit();
    }
    const quickSearch = (
      <ResponsiveQuickSearch
        name="quickSearch"
        label={intl.formatMessage({ id: 'app.features.donation.list.search', defaultMessage: 'Search by amount' })}
        quickSearch={search}
        onSubmit={this.onQuickSearch}
        onChange={this.onSearchChange}
        icon={<SearchIcon className="text-secondary" />}
      />
    );
    const filterIcon = this.props.donation.filters.isEmpty() ? (
      <FilterIcon color="white" />
    ) : (
      <FilterFullIcon color="white" />
    );
    return (
      <div>
        <ResponsiveList
          title={intl.formatMessage({ id: 'app.features.donation.list.title', defaultMessage: 'Donations' })}
          intl={intl}
          cols={cols}
          items={items}
          quickSearch={quickSearch}
          mainCol="don_mnt"
          filterIcon={filterIcon}
          cancelPanelIcon={<CancelPanelIcon />}
          validPanelIcon={<ValidPanelIcon />}
          sortDownIcon={<SortDownIcon color="secondary" />}
          sortUpIcon={<SortUpIcon color="secondary" />}
          sortNoneIcon={<SortNoneIcon color="secondary" />}
          calIcon={<CalendarIcon className="text-secondary" />}
          clearIcon={<ClearIcon className="text-warning" />}
          inlineActions={inlineActions}
          globalActions={globalActions}
          sort={this.props.donation.sort}
          filters={this.props.donation.filters}
          onSearch={this.onQuickSearch}
          onClearFilters={this.onClearFilters}
          onSort={this.onUpdateSort}
          onSetFiltersAndSort={this.onSetFiltersAndSort}
          onLoadMore={this.onLoadMore}
          loadMorePending={this.props.donation.loadMorePending}
          loadMoreFinish={this.props.donation.loadMoreFinish}
          loadMoreError={this.props.donation.loadMoreError}
          fClassName={this.itemClassName}
        />
        {this.state.donId > 0 && (
          <Modify modal={true} donId={this.state.donId} onClose={this.onClose} />
        )}
        {this.state.donId === 0 && <Create modal={true} onClose={this.onClose} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    donation: state.donation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(List));
