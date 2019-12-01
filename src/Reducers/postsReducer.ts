import {
	GET_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
} from '../Actions/types';

interface Post {
	title: string;
	content: string;
};

interface Posts {
	posts: Post[];
}

interface Action {
	type: string;
	payload: Posts | Post;
}

const initialState: Posts = {
	posts: []
}

export const postsReducer = (state: Posts = initialState, action: Action) => {
	switch(action.type) {
		case GET_POSTS:
		case DELETE_POST: {
			return {...state, posts: action.payload}
			break;
		}
		case CREATE_POST: {
			return {...state, posts: [...state.posts, action.payload]}
			break;
		}
		case UPDATE_POST: {
			return {...state, posts: [...state.posts, action.payload]}
			break;
		}
		default: return state;
	}
}