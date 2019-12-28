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
			{ id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod magna in arcu hendrerit molestie. Nunc pretium neque mollis, aliquam est eu, egestas mi. Fusce urna nulla', owner: true, friends: true },
			{ id: 2, content: 'tempus at fringilla eu, consequat mollis tellus. Maecenas dapibus dictum viverra. Aenean ac nibh vel lacus volutpat imperdiet.', owner: true, friends: true },
			{ id: 3, content: 'Aliquam erat volutpat. Aenean nec elit aliquam, elementum purus ac, rutrum massa. Morbi dapibus euismod sem, sed gravida quam malesuada a.', owner: true, friends: true },
			{ id: 4, content: 'Curabitur vestibulum, magna eu tempor vestibulum, tortor sapien sollicitudin urna, ut laoreet metus massa sit amet augue. Aliquam erat volutpat.', owner: false, friends: false },
			{ id: 5, content: 'Phasellus vitae placerat risus, nec commodo erat. Pellentesque malesuada erat nec egestas aliquam. Morbi est metus, feugiat sed laoreet vitae, rhoncus eget lorem.', owner: false, friends: false },
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
		payload: [...newList, post]
	}
}


export const searchFriends = () => {
	console.log('exec');
}

export const addNewFriend = () => {
	console.log('exec');
}

export const removeFriend = () => {
	console.log('exec');
}