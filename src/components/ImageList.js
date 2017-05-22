import React from 'react';
import { Image } from 'components';

class ImageList extends React.Component {

    render() {
        const mapToComponents = (images) => {
            return images.map((image, i) => {
                let profile;

                this.props.getProfile(image.img.writer).then(() => {
                    console.log(this.props.profile);
                });

                return (<Image
                            onSubmit={this.props.onSubmit}
                            key={i}
                            imageData={image.img}
                            profile={this.profile}
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

const mapStateToProps = (state) => {
    return {
        profile: state.authentication.profile.info
    };
};

ImageList.propTypes = {
    onSubmit: React.PropTypes.func,
    images: React.PropTypes.array
};

ImageList.defaultProps = {
    onSubmit: (imageFile) => {
        console.error('submit function not defined');
    },
    getProfile: (username) => {
        console.error('getProfile function not defined');
    },
    imageUrl: ''
};

export default ImageList;