import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { postsReducer } from './postsReducer';

export const Reducers = combineReducers({
	user: userReducer,
	posts: postsReducer
});