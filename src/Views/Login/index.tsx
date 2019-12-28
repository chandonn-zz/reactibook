import React, { Component } from 'react';
import {
	google,
	yellow,
	pink,
	black
} from '../../Resources/colors';
import firebase from '../../firebase';
import './login.css';

interface Props {

}

interface State {
	name: string;
	mail: string;
	password: string;
	passwordConfirmation: string;
	type: 'login' | 'register';
	errorMail: string;
	errorPass: string;
	errorPassConfirm: string;
	errorCodeLogin: string;
	errorCodeCreate: string;
}

interface ErrorProps {
	text: string;
}

class ErrorMessage extends Component<ErrorProps> {
	render() {
		if (this.props.text.length > 0) {
			return(
				<p style={{ color: 'red' }}>{this.props.text}</p>
			)
		} else {
			return (null)
		}
	}
}

const errorCodes: any = {
	'no-email': 'Please write your email',
	'no-pass': 'Please write a password with at least 6 digits',
	'different-password': 'Your passwords must be the same',
	'auth/email-already-in-use': 'This email has an account, please login with it',
	'login-error': 'There was an error, please try again',
	'no-credentials': 'Please, login to an existing account',
	'auth/wrong-password': 'Wrong password',
	'auth/user-not-found': 'No account found for this email, please create one'
}

class LoginPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			password: '',
			passwordConfirmation: '',
			type: 'login',
			errorMail: '',
			errorPass: '',
			errorPassConfirm: '',
			errorCodeLogin: '',
			errorCodeCreate: '',
		}
	}

	updateMail(mail: string) {
		let errorMessage = '';

		this.setState({ mail, errorMail: errorMessage });
	}

	updatePassword(password: string) {
		let errorMessage = '';

		this.setState({ password, errorPass: errorMessage });
	}

	updatePasswordConfirmation(passwordConfirmation: string) {
		let errorMessage = passwordConfirmation !== this.state.password &&
			passwordConfirmation.length > 0 ? 'As duas senhas precisam ser iguais' : '';

		this.setState({ passwordConfirmation, errorPassConfirm: errorMessage });
	}

	emailLogin() {
		const { mail, password, errorMail, errorPass } = this.state;

		if (errorMail === ''
			&& errorPass === ''
			&& mail.length > 0
			&& password.length > 0
		) {
			
			const auth = firebase.auth();
			const promisse = auth.signInWithEmailAndPassword(mail, password);
			
			promisse.catch(e => {
				if (errorCodes[e.code]) {
					this.setState({ errorCodeLogin: errorCodes[e.code] });
				} else {
					this.setState({ errorCodeLogin: errorCodes['login-error'] });
				}

				console.log(e)
			});
		} else {
			this.setState({ errorCodeLogin: errorCodes['no-credentials'] })
		}

		return;
	}

	emailSignin() {
		const {
			mail,
			password,
			passwordConfirmation,
			errorMail,
			errorPass,
			errorPassConfirm,
		} = this.state;

		if (errorMail === ''
			&& errorPass === ''
			&& errorPassConfirm === ''
			&& mail.length > 0
			&& password.length > 0
			&& passwordConfirmation.length > 0
		) {
			const auth = firebase.auth();
			const promisse = auth.createUserWithEmailAndPassword(mail, password);
			
			promisse.catch(e => {
				if (errorCodes[e.code]) {
					this.setState({ errorCodeCreate: errorCodes[e.code] });
				} else {
					this.setState({ errorCodeCreate: errorCodes['login-error'] });
				}
				console.log(e)
			});
		}

		return;
	}

	async googleLogin() {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().languageCode = 'pt';

		firebase.auth().signInWithPopup(provider).then(result => {
			const user = result.user;

			console.log(user);
		}).catch(error => {
			console.log(error)
		})
	}

	render() {
		const {
			name,
			mail,
			password,
			passwordConfirmation,
			type,
			errorMail,
			errorPass,
			errorPassConfirm,
			errorCodeLogin,
			errorCodeCreate,
		} = this.state;

		return (
			<div className="login-container">
				<h2 style={{ marginBottom: 40 }}>Reactibook</h2>

				<div className="login-method">
					<button
						className="btn"
						style={{ borderColor: type === 'login' ? pink : 'transparent', borderWidth: 1 }}
						onClick={() => this.setState({ type: 'login' })}
					>
						<span>Login</span>
					</button>
					<button
						className="btn"
						style={{ borderColor: type === 'register' ? pink : 'transparent', borderWidth: 1 }}
						onClick={() => this.setState({ type: 'register' })}
					>
						<span>Create account</span>
					</button>
				</div>
				{type === 'login' ?
					(<div>
						<p>Login with e-mail and password</p>
						<div className="login-field">
							<input
								style={{
									border: errorMail.length > 0 ? 'red' : 'transparent',
									marginTop: 5,
									marginBottom: 5,
								}}
								className="form-control"
								type="email"
								value={mail}
								onChange={(event) => this.updateMail(event.target.value)}
								placeholder="Email"
							/>
							<ErrorMessage text={errorMail} />
						</div>
						<div className="login-field">
							<input
								style={{
									border: errorPass.length > 0 ? 'red' : 'transparent'
								}}
								className="form-control"
								type="password"
								value={password}
								onChange={(event) => this.updatePassword(event.target.value)}
								placeholder="Senha"
							/>
							<ErrorMessage text={errorPass} />
						</div>
						<div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
							<button className="btn" style={{ backgroundColor: pink, width: '40%' }} onClick={() => this.emailLogin()}>
								<span style={{ color: '#fff', fontWeight: 'bold' }}>Login</span>
							</button>
							<button className="btn" style={{ backgroundColor: google, width: '40%' }} onClick={() => this.googleLogin()}>
								<span style={{ color: '#fff', fontWeight: 'bold' }}>Google</span>
							</button>
						</div>
						<div>
							<ErrorMessage text={errorCodeLogin} />
						</div>
					</div>)
					:
					(<div>
						<p>Create account with e-mail and password</p>
						<div className="login-field">
							<input
								className="form-control"
								type="text"
								value={name}
								onChange={(event) => this.setState({ name: event.target.value})}
								placeholder="Name"
							/>
							<ErrorMessage text={errorMail} />
						</div>
						<div className="login-field">
							<input
								style={{
									border: errorMail.length > 0 ? 'red' : 'transparent'
								}}
								className="form-control"
								type="email"
								value={mail}
								onChange={(event) => this.updateMail(event.target.value)}
								placeholder="Email"
							/>
							<ErrorMessage text={errorMail} />
						</div>
						<div className="login-field">
							<input
								style={{
									border: errorPass.length > 0 ? 'red' : 'transparent',
								}}
								className="form-control"
								type="password"
								value={password}
								onChange={(event) => this.updatePassword(event.target.value)}
								placeholder="Senha"
							/>
							<ErrorMessage text={errorPass} />
						</div>
						<div className="login-field">
							<input
								style={{
									border: errorPassConfirm.length > 0 ? 'red' : 'transparent'
								}}
								className="form-control"
								type="password"
								value={passwordConfirmation}
								onChange={(event) => this.updatePasswordConfirmation(event.target.value)}
								placeholder="Confirme sua senha"
							/>
							<ErrorMessage text={errorPassConfirm} />
						</div>
						<div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between' }}>
							<button className="btn" style={{ backgroundColor: pink, width: '40%' }} onClick={() => this.emailSignin()}>
								<span style={{ color: '#fff', fontWeight: 'bold' }}>Signin</span>
							</button>
							<button className="btn" style={{ backgroundColor: google, width: '40%' }} onClick={() => this.googleLogin()}>
								<span style={{ color: '#fff', fontWeight: 'bold' }}>Google</span>
							</button>
						</div>
						<div>
							<ErrorMessage text={errorCodeCreate} />
						</div>
					</div>)
				}

			</div>
		)
	}
}

export default LoginPage;