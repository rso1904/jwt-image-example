import React from 'react';

class Image extends React.Component {

    constructor(props) {
        super(props);
        
        var base64 = btoa(
                            new Uint8Array(this.props.imageData.data.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        
        this.state = {
            data: base64,
            contentType: props.imageData.contentType
        };

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.onSubmit(this.state);
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        /*
        reader.onloadend = () => {
            this.setState({
                file: file,
                imageUrl: reader.result
            });
        }
*/
       reader.readAsDataURL(file);
    }

    render() {
        let imageUrl =  this.state.data;
        let $imagePreview = null;
        
        var blob = new Blob(imageUrl);
        console.log(blob);
        window.open(window.URL.createObjectURL(blob),'Name','resizable=1');
        if (imageUrl) {
            $imagePreview = (<img src={blob} />);
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" onChange={this.handleImageChange} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                        </div>
                    </div>
                     <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleSubmit}>Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
                {$imagePreview}
            </div>
        );
    }
}

Image.propTypes = {
    file: React.PropTypes.string,
    imageUrl: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    imageData: React.PropTypes.object
};

Image.defaultProps = {
    file: 'File',
    imageUrl: {},
    onSubmit: (imageFile) => {
        console.error("submit function isn't defined")
    }
};

export default Image;