import { Reducers } from '../Reducers';
import { createStore } from 'redux';

export const Store = createStore(Reducers);

export interface User {
	email: string;
	uid: string;
}

export interface Action {
	type: string;
	payload: User;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	owner: boolean;
}

export interface StoreTypes {
	posts: Post[];
	post: Post;
	user: User;
	action: Action;
}