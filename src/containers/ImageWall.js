import React from 'react';
import { connect } from 'react-redux';
import { ImageList } from 'components';
import { 
    imageUploadRequest,
    imageListRequest } from 'actions/image';

class ImageWall extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.imageListRequest().then(
            () => {
                 Materialize.toast('loading Success', 2000);
            }
        );
    }

    render() {
        return (
            <ImageList onSubmit={this.props.imageUploadRequest}
                        images={this.props.images}/>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.image.status,
        images: state.image.images
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        imageUploadRequest: (imageFile) => {
            return dispatch(imageUploadRequest(imageFile));
        },
        imageListRequest: () => {
            return dispatch(imageListRequest());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageWall);