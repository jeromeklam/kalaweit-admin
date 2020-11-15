import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'react-bootstrap-front';
import { Camera as CameraIcon } from '../icons';
import { DropZone, Avatar } from '../ui';

export default class IdentificationAvatar extends Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
    onChangeUser: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: props.authUser,
      menuAvatar: false,
      refAvatar: React.createRef(),
    };
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onMenuAvatar = this.onMenuAvatar.bind(this);
  }

  onMenuAvatar() {
    this.setState({ menuAvatar: !this.state.menuAvatar });
  }

  onChangeAvatar(acceptedFiles) {
    this.onMenuAvatar();
    if (acceptedFiles !== null) {
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
            const binaryStr = reader.result;
            const event = {
              target: {
                name: 'user_avatar',
                value: binaryStr,
              },
            };
            this.props.onChangeUser && this.props.onChangeUser(event);
          };
          reader.readAsDataURL(file);
        });
      });
      const reload = Promise.all(promises);
      reload.then(result => {
        //console.log('InputImage result', result);
      });
    } else {
      const event = {
        target: {
          name: 'user_avatar',
          value: null,
        },
      };
      //console.log("FK supprimer avatar",event);
      this.props.onChangeUser && this.props.onChangeUser(event);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="auth-identification-avatar">
        <div className="avatar">
          <Avatar
            user={user}
            size='150'
          />
          <button
            className="btn text-secondary avatar-change"
            ref={this.state.refAvatar}
            onClick={this.onMenuAvatar}
          >
            <CameraIcon />
          </button>
          {this.state.menuAvatar && (
            <Dropdown align="bottom-right" myRef={this.state.refAvatar} onClose={this.onMenuAvatar}>
              <div
                className="bg-light border border-secondary text-secondary"
                aria-labelledby="dropdownMenuButton"
              >
                <button type="button" className="text-secondary dropdown-item">
                  <div className="drop-zone">
                    <DropZone
                      onDrop={acceptedFiles => {
                        this.onChangeAvatar(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <FormattedMessage
                              id="app.features.auth.user.avatar.update"
                              defaultMessage="Change"
                            />
                          </div>
                        </section>
                      )}
                    </DropZone>
                  </div>
                </button>
                <button
                  type="button"
                  className="text-secondary dropdown-item"
                  onClick={() => this.onChangeAvatar(null)}
                >
                  <FormattedMessage
                    id="app.features.auth.user.avatar.remove"
                    defaultMessage="Remove"
                  />
                </button>
              </div>
            </Dropdown>
          )}
        </div>
        <p className="pt-3">{user.user_login}</p>
      </div>
    );
  }
}
