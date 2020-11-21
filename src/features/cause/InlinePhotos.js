import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { normalizedObjectModeler, getJsonApi } from 'jsonapi-front';
import { ResponsiveConfirm } from 'react-bootstrap-front';
import { CenteredLoading3Dots } from '../ui';
import * as actions from './redux/actions';
import {
  DelOne as DelOneIcon,
  Download as DownloadIcon,
  View as ViewIcon,
  Upload as UploadIcon,
  Checked as CheckedIcon,
  UnChecked as UncheckedIcon,
} from '../icons';
import { downloadCauseMediaBlob } from './';
import { downloadBlob, ImageModal } from '../ui';

export class InlinePhotos extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      caum_id: 0,
      id: this.props.cauId,
      view: false,
      blob: false,
      item: null,
    };
    this.onCheck = this.onCheck.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmPhoto = this.onConfirmPhoto.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.onView = this.onView.bind(this);
    this.onCloseView = this.onCloseView.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPhotos(this.state.id, true).then(result => {});
  }

  onCheck(item, caum_id) {
    item.default_blob.id = caum_id;
    let obj = getJsonApi(item, 'FreeAsso_Cause', item.id);
    this.props.actions
      .updateOne(item.id, obj)
      .then(result => {
        this.props.actions.propagateModel('FreeAsso_Cause', result);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  onDropFiles(item, acceptedFiles) {
    const promises = acceptedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = () => {
          reject();
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          this.props.actions.uploadPhoto(0, item.id, binaryStr, file.name).then(result => resolve(true));
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.props.actions.loadPhotos(item.id, true);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caum_id: 0 });
  }

  onConfirmPhoto(id) {
    this.setState({ confirm: !this.state.confirm, caum_id: id });
  }

  onConfirm(item) {
    const caum_id = this.state.caum_id;
    this.setState({ confirm: false, caum_id: 0 });
    this.props.actions.delCauseMedia(caum_id).then(result => {
      this.props.actions.loadPhotos(item.id, true);
    });
  }

  onDownload(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.sitm_title);
    });
  }

  onView(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const bytes = new Uint8Array(result.data); 
      const blob = new Blob([bytes], {type: type});
      const url = window.URL.createObjectURL(blob);
      this.setState({blob: url, view: true, item: item});
    });
  }

  onCloseView() {
    this.setState({blob: null, view: false, item: null});
  }

  render() {
    let photos = [];
    if (this.props.cause.photos.FreeAsso_CauseMedia) {
      photos = normalizedObjectModeler(this.props.cause.photos, 'FreeAsso_CauseMedia', null, {eager: true});
    }
    return (
      <div>
        <div className="cause-inline-photos">
          {this.props.cause.loadPhotosPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              {photos.map(photo => {
                if (photo.caum_type !== 'PHOTO') {
                  return null;
                }
                let img = '';
                try {
                  if (photo.caum_short_blob) {
                    img = `data:image/jpeg;base64,${photo.caum_short_blob}`;
                  }
                } catch (ex) {
                  console.log(ex);
                }
                return (
                  <div className="col" key={photo.id}>
                    <div className="card mt-2">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-xs-w12">
                            <span className="">
                              <small>
                                <FormattedMessage id="app.features.picture.list.main" defaultMessage="Main" />
                              </small>
                            </span>
                            &nbsp;
                            {photo.id === this.props.cause.photosItem.default_blob.id ? (
                              <CheckedIcon className="text-secondary" />
                            ) : (
                              <UncheckedIcon
                                className="text-secondary inline-action"
                                onClick={() => {
                                  this.onCheck(this.props.cause.photosItem, photo.id);
                                }}
                              />
                            )}
                          </div>
                          <div className="col-xs-w24 text-right">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                              <button type="button" className="btn btn-inline btn-secondary text-light">
                                <ViewIcon
                                  className="text-light inline-action"
                                  onClick={() => this.onView(photo)}
                                />
                              </button>
                              <button type="button" className="btn btn-inline btn-secondary text-light">
                                <DownloadIcon
                                  className="text-light inline-action"
                                  onClick={() => this.onDownload(photo)}
                                />
                              </button>
                              <button type="button" className="btn btn-inline btn-warning text-light">
                                <DelOneIcon
                                  onClick={() => this.onConfirmPhoto(photo.id)}
                                  className="text-light inline-action"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-center">
                        {img && <img src={img} className="rounded" alt="" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col" key={'000'}>
                <div className="card mt-2">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-xs-w36">
                        <span className="">
                          <FormattedMessage id="app.features.picture.list.add" defaultMessage="Add one picture" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    {this.props.cause.uploadPhotoPending ? (
                      <div className="text-center">
                        <CenteredLoading3Dots />
                      </div>
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.props.cause.photosItem, acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()} className="text-primary">
                              <input {...getInputProps()} />
                              <UploadIcon className="text-primary inline-action" size={4} />
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {this.state.view && (
          <ImageModal
            show={this.state.view}
            onClose={this.onCloseView}
            title={Image}
            image={this.state.blob}
          />
        )}
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm(this.props.cause.photosItem);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlinePhotos));
