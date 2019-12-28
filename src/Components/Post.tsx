import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreTypes } from '../Store';
import { updatePost, deletePost } from '../Actions';
import './components.css';

interface Props {
	post: StoreTypes['post'];
	updatePost: (post: StoreTypes['post']) => void;
	deletePost: (id: number) => void;
}

interface State {
	edit: boolean;
	friends: boolean;
	content: string;
}

class Post extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			edit: false,
			content: this.props.post.content,
			friends: this.props.post.friends,
		}
	}

	savePost() {
		const {
			friends,
			content
		} = this.state;
		const { post: { id, owner } } = this.props;

		if (content.length < 1) {
			alert('Give your post a content');
			return;
		}

		try {
			this.props.updatePost({ content, id, owner, friends });
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
		const { edit, content, friends } = this.state;

		if (this.state.edit) {
			return (
				<div className="card post">
					<textarea
						className="form-control"
						value={content}
						onChange={(event) => this.setState({ content: event.target.value })}
						rows={2} cols={30}
					/>

					<div>
						<div>
							{friends ? 'so para amigos' : 'publico'}
						</div>
						<div>
							<button className="btn" onClick={() => this.setState({ edit: false })}>
								<p>Cancelar</p>
							</button>
							<button className="btn" onClick={() => this.savePost()}>
								<p>Salvar</p>
							</button>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="card post">
				<span className="post-content">{post.content}</span>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<span className="post-meta">{post.friends ? 'Friends' : 'Public'}</span>
					</div>	
					<div>
						<button className="btn btn-outline-dark" onClick={() => this.excludePost()}>
							<span style={{ fontSize: 12 }}>Delete</span>
						</button>
						<button style={{ marginLeft: 10 }} className="btn btn-outline-dark" onClick={() => this.setState({ edit: true })}>
							<span style={{ fontSize: 12 }}>Edit</span>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(null, { updatePost, deletePost })(Post);