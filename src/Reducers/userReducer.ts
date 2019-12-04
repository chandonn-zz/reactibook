import { SET_USER } from '../Actions/types';
import { StoreTypes } from '../Store';

const initialState: StoreTypes['user'] | null = null;

export const userReducer = (state: StoreTypes['user'] | null = initialState, action: StoreTypes['action']) => {
	switch(action.type) {
		case SET_USER: {
			return action.payload;
		}
		default: return state;
	}
}