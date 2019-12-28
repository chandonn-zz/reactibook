import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFriends, addNewFriend, removeFriend } from '../Actions';

interface Props {
	searchFriends: () => void;
	addNewFriend: () => void;
	removeFriend: () => void;
}

interface State {
	searchTerm: string;
}

class SearchBar extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			searchTerm: ''
		}
	}

	search(search: string) {
		console.log(search)
	}

	render() {
		const { searchTerm } = this.state;

		return (
			<div style={{
				position: 'fixed',
				width: '100%',
				padding: '10px 0',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
				zIndex: 999
			}}>
				<input
					style={{ width: '30%', minWidth: 300, backgroundColor: '#dbd8d8' }}
					type="text"
					className="form-control rounded-pill"
					value={searchTerm}
					onChange={(event) => this.search(event.target.value)}
					placeholder="Add new friends"
				/>
			</div>
		)
	}
}

export default connect(null, { searchFriends, addNewFriend, removeFriend })(SearchBar);