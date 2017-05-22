import React from 'react';
import { Upload, ProFileUpload } from 'components';
import { connect } from 'react-redux';
import { imageUploadRequest } from 'actions/image';
import { updateRequest } from 'actions/authentication';

class UploadWall extends React.Component {
    render() {
        let path = this.props.location.pathname.split("/upload");
        let pathOn;

        if (path[1] === '/profile')
            pathOn = true;

        return (
            <div>
            {pathOn ? <ProFileUpload onSubmit={this.props.updateRequest}
                    currentUser={this.props.currentUser}></ProFileUpload> : <Upload onSubmit={this.props.imageUploadRequest}
                    currentUser={this.props.currentUser}></Upload>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.image.status,
        currentUser: state.authentication.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        imageUploadRequest: (imageFile) => {
            return dispatch(imageUploadRequest(imageFile));
        },
        updateRequest : (data) => {
            return dispatch(updateRequest(data));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UploadWall);