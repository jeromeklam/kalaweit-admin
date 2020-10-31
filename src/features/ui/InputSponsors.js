import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { InputText, InputCheckbox } from 'react-bootstrap-front';
import { DelOne as DelOneIcon, Plus as PlusIcon } from '../icons';

class InputSponsorLine extends Component {
  static propTypes = {
    value: PropTypes.element.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    const { value, onChange, onDelete } = this.props;
    return (
      <div className="row">
        <div className="col-sm-12">
          <InputText
            name="name"
            value={value.name}
            labelTop={false}
            inputSize={36}
            label=""
            onChange={onChange}
          />
        </div>
        <div className="col-sm-12">
          <InputText
            name="email"
            value={value.email}
            labelTop={false}
            inputSize={36}
            label=""
            onChange={onChange}
          />
        </div>
        <div className="col-sm-4">
          <InputCheckbox
            name="site"
            checked={value.site}
            labelTop={false}
            inputSize={36}
            label=""
            onChange={onChange}
          />
        </div>
        <div className="col-sm-4">
          <InputCheckbox
            name="news"
            checked={value.news}
            labelTop={false}
            inputSize={36}
            label=""
            onChange={onChange}
          />
        </div>
        <div className="col-sm-4">
          <button className="btn bg-light btn-outline-secondary">
            <DelOneIcon className="text-warning" onClick={onDelete}/>
          </button>
        </div>
      </div>
    );
  }
}

const emptyItem = { name: '', email: '', site: true, news: true };

class InputSponsors extends Component {
  static propTypes = {
    label: PropTypes.string,
  };
  static defaultProps = {
    label: '',
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.onDelOne = this.onDelOne.bind(this);
  }

  onAddNew() {
    const datas = this.props.value;
    let sponsors = JSON.parse(datas) || [emptyItem];
    sponsors.push(emptyItem);
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(sponsors),
      },
    });
  }

  onDelOne(idx) {
    const datas = this.props.value;
    let sponsors = JSON.parse(datas) || [emptyItem];
    sponsors.splice(idx, 1)
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(sponsors),
      },
    });
  }

  onChange(event, idx) {
    let value = event.target.value;
    if (event.target.type === 'checkbox') {
      value = event.target.checked || false;
    }
    console.log(event.target, value);
    const datas = this.props.value;
    let sponsors = JSON.parse(datas) || [emptyItem];
    sponsors[idx][event.target.name] = value;
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(sponsors),
      },
    });
  }

  render() {
    let addNew = true;
    const datas = this.props.value;
    const sponsors = JSON.parse(datas) || [emptyItem];
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12">
            <span>
              <FormattedMessage id="app.features.sponsors.list.col.name" defaultMessage="Fullname" />
            </span>
          </div>
          <div className="col-sm-12">
            <span>
              <FormattedMessage id="app.features.sponsors.list.col.email" defaultMessage="Email" />
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <FormattedMessage id="app.features.sponsors.list.col.displaySite" defaultMessage="Show on site" />
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <FormattedMessage id="app.features.sponsors.list.col.sendNews" defaultMessage="Send news" />
            </span>
          </div>
        </div>
        {sponsors.map((sponsor, i) => {
          if (sponsor.name === '' && sponsor.email === '') {
            addNew = false;
          }
          return (
            <InputSponsorLine
              key={`sponsor-${i}`}
              value={sponsor}
              onChange={event => this.onChange(event, i)}
              onDelete={event => this.onDelOne(i)}
            />
          );
        })}
        {addNew && (
          <button className="btn bg-light btn-outline-secondary" onClick={this.onAddNew}>
            <PlusIcon className="text-primary"/>
          </button>
        )}
      </div>
    );
  }
}

export default injectIntl(InputSponsors);