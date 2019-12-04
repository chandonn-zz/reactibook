import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreTypes } from '../Store';
import { updatePost, deletePost } from '../Actions';

interface Props {
	post: StoreTypes['post'];
	updatePost: (post: StoreTypes['post']) => void;
	deletePost: (id: number) => void;
}

interface State {
	edit: boolean;
	title: string;
	content: string;
}

class Post extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			edit: false,
			title: this.props.post.title,
			content: this.props.post.content,
		}
	}

	savePost() {
		const {
			title,
			content
		} = this.state;
		const { post: { id, owner } } = this.props;

		if (title.length < 1) {
			alert('Give your post a title');
			return;
		}

		if (content.length < 1) {
			alert('Give your post a content');
			return;
		}

		try {
			this.props.updatePost({ title, content, id, owner });
		} catch(e) {
			console.log(e)
			alert('There was an error, try again');
		}

		this.setState({ edit: false });
	}

	excludePost() {
		this.props.deletePost(this.props.post.id);
	}

	render() {
		const { post } = this.props;
		const { edit, title, content } = this.state;

		if (this.state.edit) {
			return (
				<div>
					<input type="text" value={title} onChange={(event) => this.setState({ title: event.target.value })} />
					<textarea
						value={content}
						onChange={(event) => this.setState({ content: event.target.value })}
						rows={5} cols={30}
					/>

					<div>
						<button onClick={() => this.setState({ edit: false })}>
							<p>Cancelar</p>
						</button>
						<button onClick={() => this.savePost()}>
							<p>Salvar</p>
						</button>
					</div>
				</div>
			)
		}

		return (
			<div>
				<p>{post.title}</p>
				<p>{post.content}</p>
				<p>{post.id}</p>
				<div>
					<button className="btn" onClick={() => this.excludePost()}>
						<p>Delete</p>
					</button>
					<button className="btn" onClick={() => this.setState({ edit: true })}>
						<p>Edit</p>
					</button>
				</div>
			</div>
		)
	}
}

export default connect(null, { updatePost, deletePost })(Post);