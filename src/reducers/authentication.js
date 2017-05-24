import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT',
        token: ''
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
    },
    update: {
        status: 'INIT',
        error: -1
    },
    profile: {
        status: 'INIT',
        info: {},
        error: -1
    }
};

export default function authentication(state, action) {
    if (typeof state === "undefined")
        state = initialState;
    switch (action.type) {
        /* LOGIN */
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' },
                    token: { $set: action.token }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });
        /* LOGOUT */
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });
        /* UPDATE */
        case types.AUTH_UPDATE:
            return update(state, {
                update: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_UPDATE_SUCCESS:
            return update(state, {
                update: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_UPDATE_FAILURE:
            return update(state, {
                update: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* GET PROFILE*/
        case types.AUTH_PROFILE:
            return update(state, {
                profile: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_PROFILE_SUCCESS:
            return update(state, {
                profile: {
                    status: { $set: 'SUCCESS' },
                    info: { $set: action.account }
                }
            });
        case types.AUTH_PROFILE_FAILURE:
            return update(state, {
                profile: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}