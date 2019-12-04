import {
	GET_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
} from '../Actions/types';
import { Post } from '../Store';

interface Action {
	type: string;
	payload: Post[] | Post;
}

const initialState: Post[] = [];

export const postsReducer = (state: Post[] = initialState, action: Action) => {
	switch(action.type) {
		case GET_POSTS:
		case CREATE_POST:
		case UPDATE_POST:
		case DELETE_POST: {
			return action.payload
			break;
		}
		default: return state;
	}
}