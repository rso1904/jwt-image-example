import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Container Components
import { App, Home, Login, Register, Wall, ImageWall, UploadWall, ProfileWall } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { loginSuccess } from 'actions/authentication'
import jwtDecode from 'jwt-decode';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');


let token = localStorage.getItem('token');

if (token !== null) {
    let decode = jwtDecode(token);
    store.dispatch(loginSuccess(decode.username, token));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
                <Route path="wall/:username" component={Wall} />
                <Route exact path="/image" component={ImageWall} />
                <Route exact path="/image/:writer" component={ImageWall} />
                <Route exact path="/image/hashtags/:hashtags" component={ImageWall} />
                <Route exact path="upload" component={UploadWall} />
                <Route exact path="/upload/profile" component={UploadWall} />
                <Route path="/profile" component={ProfileWall} />
            </Route>
        </Router>
    </Provider>, rootElement
);