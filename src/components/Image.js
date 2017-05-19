import React from 'react';
import { Link } from 'react-router';

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: this.props.imageData.convert
        };

        this.getHashtags = this.getHashtags.bind(this);
    }

    getHashtags(contents, isOn) {
        let type = contents.split('#');
        let hash;
        if (type.length > 1)
            hash = type[1];
        if (isOn === true) {
            return hash;
        } else {
            return type[0];
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        this.setState({
            imagePreviewUrl: this.props.imageData.convert
        });
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        let hashtags = this.getHashtags(this.props.imageData.contents, true);
        let contents = this.getHashtags(this.props.imageData.contents);

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } 
        
        return (
            <div className="container image">
                <div className="row">
                    <div className="col s12 m7">
                        <div className="card">
                            <div className="card-image">
                                {$imagePreview}
                                <span className="card-title"></span>
                            </div>
                            <div className="card-content">
                                <Link to={`/image/${this.props.imageData.writer}`} className="writer">ID: {this.props.imageData.writer}</Link>
                                <p>{contents} {typeof hashtags !== "undefined" ? <Link to={`/image/hashtags/${hashtags}`} className="hashtags">#{hashtags}</Link> : undefined}</p>
                            </div>
                            <div className="card-action">
                                <a href="/upload"><i className="material-icons">present_to_all</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Image.propTypes = {
    onSubmit: React.PropTypes.func,
    imageData: React.PropTypes.object
};

Image.defaultProps = {
    onSubmit: (imageFile) => {
        console.error("submit function isn't defined")
    },
    imageData: {}
};

export default Image;