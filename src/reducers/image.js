import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    status: 'INIT',
    images: []
};

export default function upload(state, action) {
    if (typeof state === 'undefined') {
        state = initialState;
    }

    switch(action.type) {
        case types.IMAGE_UPLOAD:
            return update(state, {
                status: { $set: 'WAITING' }
            });
        case types.IMAGE_UPLOAD_SUCCESS:
            return update(state, {
                status: { $set: 'SUCCESS' }
            });
        case types.IMAGE_UPLOAD_FAILURE:
            return update(state, {
                status: { $set: 'FAILURE' }
            });
        case types.IMAGE_LIST:
            return update(state, {
                status: { $set: 'WAITING'}
            });
        case types.IMAGE_LIST_SUCCESS:
            return update(state, {
                status: { $set: 'SUCCESS' },
                images: { $set: action.images }
            });
        case types.IMAGE_LIST_FAILURE:
            return update(state, {
                status: { $set: 'FAILURE' }
            });
        case types.IMAGE_DELETE:
            return update(state, {
                status: { $set: 'WAITING' }
            });
        case types.IMAGE_DELETE_SUCCESS:
            return update(state, {
                status: { $set: 'SUCCESS' },
                images: { $splice: [[action.index, 1]] }
            });
        case types.IMAGE_DELETE_FAILURE:
            return update(state, {
                status: { $set: 'FAILURE' }
            });
        default:
            return state;
    }
}