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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.params !== prevProps.params) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        if (typeof this.props.params !== "undefined") {
            this.props.imageListRequest(this.props.params.writer).then(
                () => {
                    Materialize.toast('loading Success', 2000);
                }
            );
        } else {
            this.props.imageListRequest().then(
                () => {
                    Materialize.toast('loading Success', 2000);
                }
            );
        }
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
        imageListRequest: (writer) => {
            return dispatch(imageListRequest(writer));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ImageWall);