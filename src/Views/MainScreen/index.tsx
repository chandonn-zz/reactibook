import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import LoginPage from '../Login';
import PostsPage from '../Posts';
import AdicionarAmigo from '../Adicionar';
import './mainscreen.css';
import firebase from '../../firebase';
import { loginUser } from '../../Actions';

interface Props {
	user: any;
	loginUser: (user: any) => void;
}

interface State {

}

class MainScreen extends React.Component<Props, State> {

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.loginUser(user);
			}
		})
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.user && !this.props.user) {
			window.history.pushState(null, '', '/login');
		}
	}

	render() {
		const { user } = this.props;
		return (
			<Router>
				<div className="main-screen">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							{user ? <Redirect to="/posts"/> : <LoginPage />}
						</Route>
						<Route path="/posts">
							{!user ? <Redirect to="/login"/> : <PostsPage />}
						</Route>
						<Route path="/adicionar">
							{!user ? <Redirect to="/login"/> : <AdicionarAmigo />}
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

const mapToProps = ({ user }: Props) => ({ user });

export default connect(mapToProps, { loginUser })(MainScreen);