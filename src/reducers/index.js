import authentication from './authentication';
import search from './search'
import image from './image';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    search,
    image
});