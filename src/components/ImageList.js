import React from 'react';
import { Image } from 'components';
import { connect } from 'react-redux';

class ImageList extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentupdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const mapToComponents = (images) => {
            return images.map((image, i) => {
                return (<Image
                    onSubmit={this.props.onSubmit}
                    index={i}
                    imageData={image}
                    profile={this.props.arrayProfile[image.img.writer]}
                    onRemove={this.props.onRemove}
                    currentUser={this.props.currentUser}
                />);
            });
        };

        return (
            <div>
                {mapToComponents(this.props.images)}
            </div>
        );
    }
}

ImageList.propTypes = {
    onSubmit: React.PropTypes.func,
    images: React.PropTypes.array,
    arrayProfile: React.PropTypes.array,
    onRemove: React.PropTypes.func,
    currentUser: React.PropTypes.string
};

ImageList.defaultProps = {
    onSubmit: (imageFile) => {
        console.error('submit function not defined');
    },
    imageUrl: ''
};

export default ImageList;