import React from 'react';
import { Image } from 'components';

class ImageList extends React.Component {

    render() {
        //console.log(this.props.images[0]);
        const mapToComponents = (images) => {
            return images.map((image, i) => {
                return (<Image
                            onSubmit={this.props.onSubmit}
                            key={i}
                            imageData={image.img}
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
    images: React.PropTypes.array
};

ImageList.defaultProps = {
    onSubmit: (imageFile) => {
        console.error('submit function not defined');
    },
    imageUrl: ''
};

export default ImageList;