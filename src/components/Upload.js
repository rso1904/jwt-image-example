import React from 'react';

class Upload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: '',
            contents: '',
            writer: this.props.currentUser
        }; 
        
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);      
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.onSubmit(this.state);
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

       reader.readAsDataURL(file);
    }

     handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    render() {
        
        let {imagePreviewUrl} =  this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
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
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea1" 
                                className="materialize-textarea" 
                                onChange={this.handleChange}></textarea>
                            <label htmlfor="textarea1">Textarea</label>
                        </div>
                    </div>
                </form>
                {$imagePreview}
            </div>
        );
    }
}

Upload.propTypes = {
    onSubmit: React.PropTypes.func,
    currentUser: React.PropTypes.string
};

Upload.defaultProps = {
    onSubmit: (imageFile) => {
        console.error("submit function isn't defined")
    }
};

export default Upload;