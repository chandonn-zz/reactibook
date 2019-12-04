import * as actions from './types';
import firebase from '../firebase';
import { Store } from '../Store';

export const loginUser = (user) => {
	const {
		email,
		uid
	} = user;

	return {
		type: actions.SET_USER,
		payload: { email, uid }
	}
}

export const logOut = () => {
	return {
		type: actions.SET_USER,
		payload: null
	}
}

export const getPosts = (user) => {
	return {
		type: actions.GET_POSTS,
		payload: [
			{ id: 1, title: 'post teste', content: 'conteudo de teste', owner: true },
			{ id: 2, title: 'post teste', content: 'conteudo de teste', owner: true },
			{ id: 3, title: 'post teste', content: 'conteudo de teste', owner: true },
			{ id: 4, title: 'post teste', content: 'conteudo de teste', owner: false },
			{ id: 5, title: 'post teste', content: 'conteudo de teste', owner: false },
		],
	}
}

export const deletePost = (id) => {
	const { posts } = Store.getState();

	const newPosts = posts.filter(p => p.id !== id);

	return {
		type: actions.DELETE_POST,
		payload: newPosts,
	}
}

export const createPost = (post) => {
	const { posts } = Store.getState();

	const id = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 0;

	const newPost = { ...post, id };

	return {
		type: actions.CREATE_POST,
		payload: [...posts, newPost],
	}
}

export const updatePost = (post) => {
	const { posts } = Store.getState();

	const newList = posts.filter(p => p.id !== post.id);

	return {
		type: actions.UPDATE_POST,
		payload: [...newList, post].sort((a, b) => a.id - b.id)
	}
}