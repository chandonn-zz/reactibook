import { SET_USER } from '../Actions/types';

interface User {
	user: any;
}

interface Action {
	type: string;
	payload: User;
}

const initialState: User = {
	user: null
}

export const userReducer = (state: User = initialState, action: Action) => {
	switch(action.type) {
		case SET_USER: {
			return {...state, user: action.payload}
		}
		default: return state;
	}
}