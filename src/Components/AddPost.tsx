import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreTypes } from '../Store';
import { createPost } from '../Actions';
import './components.css';

interface Props {
	createPost: (post: StoreTypes['post']) => void;
}

interface State {
	friends: boolean;
	content: string;
	phrase: string;
}

function getPhrase() {
	// random phrases to make it more attractive and playfull
	const addPhrases = [
		'Share something',
		'Tell a bit to the world',
		'What are you thinking?',
		'Have something cool to say?',
		'Tell me about you',
		'Post anything',
		'Update your timeline',
		'How are you doing?',
		'Tell your friends a story',
		'Spread your words'
	];

	const index = Math.floor(Math.random() * Math.floor(addPhrases.length));
	return addPhrases[index]
}

class AddPost extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			friends: false,
			content: '',
			phrase: getPhrase()
		}
	}

	addNewPost() {
		const {
			friends,
			content,
		} = this.state;

		if (content.length < 1) {
			alert('Whats the content?');
			return;
		}

		try {
			this.props.createPost({ content, id: 0, owner: true, friends });
		} catch(e) {
			alert('There was an error, please try again');
			return;
		}

		this.setState({ phrase: getPhrase(), content: '', friends: false });
	}

	render() {
		const { content, phrase } = this.state;

		return (
			<div className="card post">
				<textarea
					placeholder={phrase}
					className="form-control"
					value={content}
					onChange={(event) => this.setState({ content: event.target.value })}
					rows={2} cols={30}
				/>

				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
					<div>
						<span className="post-meta">visibility</span>
					</div>
					<button className="btn btn-outline-primary" onClick={() => this.addNewPost()}>
						<span style={{ fontSize: 12 }}>Post</span>
					</button>
				</div>
			</div>
		)
	}
}

export default connect(null, { createPost })(AddPost);