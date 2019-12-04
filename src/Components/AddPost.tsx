import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreTypes } from '../Store';
import { createPost } from '../Actions';

interface Props {
	createPost: (post: StoreTypes['post']) => void;
}

interface State {
	title: string;
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
			title: '',
			content: '',
			phrase: getPhrase()
		}
	}

	addNewPost() {
		const {
			title,
			content,
		} = this.state;

		if (title.length < 1) {
			alert('Give your post a title');
			return;
		}

		if (content.length < 1) {
			alert('Whats the content');
			return;
		}

		try {
			this.props.createPost({ title, content, id: 0, owner: true });
		} catch(e) {
			alert('There was an error, please try again');
			return;
		}

		this.setState({ phrase: getPhrase(), title: '', content: '' });
	}

	render() {
		const { title, content, phrase } = this.state;

		return (
			<div>
				<p>{phrase}</p>
				<input type="text" value={title} onChange={(event) => this.setState({ title: event.target.value })} />
				<textarea
					value={content}
					onChange={(event) => this.setState({ content: event.target.value })}
					rows={5} cols={30}
				/>

				<div>
					<button onClick={() => this.addNewPost()}>
						<p>Post it</p>
					</button>
				</div>
			</div>
		)
	}
}

export default connect(null, { createPost })(AddPost);