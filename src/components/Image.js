import React from 'react';
import { Link } from 'react-router';

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: this.props.imageData.img.convert
        };

        this.getHashtags = this.getHashtags.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
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

    handleRemove() {
        let id = this.props.imageData._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        this.setState({
            imagePreviewUrl: this.props.imageData.img.convert
        });
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let hashtags = this.getHashtags(this.props.imageData.img.contents, true);
        let contents = this.getHashtags(this.props.imageData.img.contents);

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
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
                                <Link to={`/image/${this.props.imageData.img.writer}`} className="writer">
                                    <div className="chip">
                                        <img src={this.props.profile.image} alt="Contact Person"></img>
                                        {this.props.imageData.img.writer}
                                    </div>
                                </Link>
                                <p>{contents} {typeof hashtags !== "undefined" ? <Link to={`/image/hashtags/${hashtags}`} className="hashtags">#{hashtags}</Link> : undefined}</p>
                            </div>
                            <div className="card-action">
                                <a href="/upload"><i className="material-icons">present_to_all</i></a>
                                {this.props.imageData.img.writer === this.props.currentUser ? <a><i className="material-icons" onClick={this.handleRemove}>delete</i></a> : ""}
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
    index: React.PropTypes.number,
    imageData: React.PropTypes.object,
    profile: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    currentUser: React.PropTypes.string
};

Image.defaultProps = {
    onSubmit: (imageFile) => {
        console.error("submit function isn't defined")
    },
    imageData: {},
    profile: {}
};

export default Image;