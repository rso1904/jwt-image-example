import React from 'react'
import { connect } from 'react-redux';
import { ImageWall } from 'containers';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadingState: false,
            initiallyLoaded: false
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.username !== prevProps.username) {
            this.componentWillUnmount();
            this.componentDidMount();
        }
    }

    componentWillUnmount() {
      // REMOVE WINDOWS SCROLL LISTENER
      $(window).unbind();

      this.setState({
          initiallyLoaded: false
      });
    }

    render() {
        const emptyView = (
            <div className="container">
                <div className="empty-page">
                    <b>{this.props.username}</b> isn't registered or hasn't written any images
                </div>
            </div>
        );

        const wallHeader = (
            <div>
                <div className="container wall-info">
                    <div className="card wall-info blue lighten-2 white-text">
                        <div className="card-content">
                            {this.props.username}
                        </div>
                    </div>
                </div>
                {this.state.initiallyLoaded ? emptyView : undefined}
            </div>
        );

        return (
            <div className="wrapper">
                {typeof this.props.username !== "undefined" ? wallHeader : undefined}
                {this.props.isLoggedIn ? <ImageWall /> : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        token: state.authentication.login.token
    };
};

Home.PropTypes = {
    username: React.PropTypes.string
};

Home.defaultProps = {
    username: undefined
};

export default connect(mapStateToProps)(Home);