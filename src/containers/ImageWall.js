import React from 'react';
import { connect } from 'react-redux';
import { ImageList } from 'components';
import {
    imageUploadRequest,
    imageListRequest,
    imageDeleteRequest
} from 'actions/image';
import { getProfileRequest } from 'actions/authentication';

class ImageWall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arrayProfile: [],
            isOn: false
        };

        this.getProfile = this.getProfile.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.params !== prevProps.params) {
            this.componentDidMount();
        }
    }

    getProfile() {
        let arrayvar = this.state.arrayProfile.slice();

        this.props.images.map((image, i) => {
            this.props.getProfileRequest(image.img.writer).then(() => {
                arrayvar[image.img.writer] = this.props.profile;
                this.setState({
                    arrayProfile: arrayvar,
                    isOn: true
                });
            });
        });
    }

    componentDidMount() {
        if (typeof this.props.params !== "undefined") {
            if (typeof this.props.params.writer !== "undefined") {
                this.props.imageListRequest(this.props.params.writer).then(
                    () => {
                        Materialize.toast('loading Success', 2000);
                        this.getProfile();
                    }
                );
            } else {
                this.props.imageListRequest(undefined, this.props.params.hashtags).then(
                    () => {
                        Materialize.toast('loading Success', 2000);
                        this.getProfile();
                    }
                );
            }
        } else {
            this.props.imageListRequest().then(
                () => {
                    Materialize.toast('loading Success', 2000);
                    this.getProfile();
                }
            );
        }
    }

    render() {

        const imageList = (<ImageList onSubmit={this.props.imageUploadRequest}
            arrayProfile={this.state.arrayProfile}
            images={this.props.images}
            onRemove={this.props.imageDeleteRequest}
            currentUser={this.props.currentUser} />);

        const loading = (<div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div claclassName="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>);

        return (
            <div>
                {this.state.isOn ? imageList : loading}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.image.status,
        images: state.image.images,
        profile: state.authentication.profile.info,
        currentUser: state.authentication.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        imageUploadRequest: (imageFile) => {
            return dispatch(imageUploadRequest(imageFile));
        },
        imageListRequest: (writer, hashtags) => {
            return dispatch(imageListRequest(writer, hashtags));
        },
        getProfileRequest: (username) => {
            return dispatch(getProfileRequest(username));
        },
        imageDeleteRequest: (id, index) => {
            return dispatch(imageDeleteRequest(id, index));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageWall);