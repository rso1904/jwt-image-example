import React from 'react';
import { browserHistory, Link } from 'react-router';

class ProFileUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: '',
            username: this.props.currentUser,
            password: '',
            email: ''
        };
        
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);    
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.onSubmit(this.state);
        //browserHistory.push('/image');
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
         if (e.target.id === "password") {
             this.setState({
                 password: e.target.value
             });
         } else if (e.target.id === "email") {
             this.setState({
                 email: e.target.value
             });
         }
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
                            <span>Profile picture</span>
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
                             <input id="password" type="password" className="validate" onChange={this.handleChange}></input>
                             <label for="password">Password</label>
                         </div>
                     </div>
                     <div className="row">
                         <div className="input-field col s12">
                             <input id="email" type="email" className="validate" onChange={this.handleChange}></input>
                             <label for="email">Email</label>
                         </div>
                     </div>
                </form>
                {$imagePreview}
            </div>
        );
    }
}

ProFileUpload.propTypes = {
    onSubmit: React.PropTypes.func,
    currentUser: React.PropTypes.string
};

ProFileUpload.defaultProps = {
    onSubmit: (imageFile) => {
        console.error("submit function isn't defined")
    }
};

export default ProFileUpload;