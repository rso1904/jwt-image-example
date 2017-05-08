import React from 'react';
import { Upload } from 'components';
import { connect } from 'react-redux';
import { imageUploadRequest } from 'actions/image';

class UploadWall extends React.Component {
    render() {
        return (
            <Upload onSubmit={this.props.imageUploadRequest}></Upload>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.image.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        imageUploadRequest: (imageFile) => {
            return dispatch(imageUploadRequest(imageFile));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UploadWall);