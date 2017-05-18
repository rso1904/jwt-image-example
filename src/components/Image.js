import React from 'react';

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: this.props.imageData.convert
        };
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        
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
                                <Link to={`/upload/${this.props.imageData.writer}`} className="username">ID: {this.props.imageData.writer}</Link>
                                <p>{this.props.imageData.contents}</p>
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