import React, { Component } from 'react';
import {
	google,
	yellow,
	pink,
	black
} from '../../Resources/colors';
import firebase from '../../firebase';

interface Props {

}

interface State {
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
	'auth/wrong-password': 'Wrong password'
}

class LoginPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
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

	googleLogin() {

	}

	googleSignin() {

	}

	render() {
		const {
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
			<div className="main-container">
				<h3>Reactibook</h3>
				<h5>Bem vindo ao mural de posts do Laboratoria</h5>
				<h5>Faça login para aproveitar</h5>

				<div className="login-container">
					<div className="login-method">
						<button onClick={() => this.setState({ type: 'login' })}>
							<p>Login</p>
						</button>
						<button onClick={() => this.setState({ type: 'register' })}>
							<p>Criar conta</p>
						</button>
					</div>
					{type === 'login' ?
						(<div>
							<p>Entre com e-mail e senha</p>
							<div>
								<input
									style={{
										border: errorMail.length > 0 ? 'red' : 'transparent'
									}}
									className="input-login"
									type="text"
									value={mail}
									onChange={(event) => this.updateMail(event.target.value)}
									placeholder="Email"
								/>
								<ErrorMessage text={errorMail} />
							</div>
							<div>
								<input
									style={{
										border: errorPass.length > 0 ? 'red' : 'transparent'
									}}
									className="input-login"
									type="password"
									value={password}
									onChange={(event) => this.updatePassword(event.target.value)}
									placeholder="Senha"
								/>
								<ErrorMessage text={errorPass} />
							</div>
							<div>
								<button className="social-login" style={{ backgroundColor: pink }} onClick={() => this.emailLogin()}>
									<p style={{ color: '#fff', fontWeight: 'bold' }}>Login</p>
								</button>
								<button className="social-login" style={{ backgroundColor: google }} onClick={() => this.googleLogin()}>
									<p style={{ color: '#fff', fontWeight: 'bold' }}>Google</p>
								</button>
							</div>
							<div>
								<ErrorMessage text={errorCodeLogin} />
							</div>
						</div>)
						:
						(<div>
							<p>Crie sua conta</p>
							<div>
								<input
									style={{
										border: errorMail.length > 0 ? 'red' : 'transparent'
									}}
									className="input-login"
									type="text"
									value={mail}
									onChange={(event) => this.updateMail(event.target.value)}
									placeholder="Email"
								/>
								<ErrorMessage text={errorMail} />
							</div>
							<div>
								<input
									style={{
										border: errorPass.length > 0 ? 'red' : 'transparent'
									}}
									className="input-login"
									type="password"
									value={password}
									onChange={(event) => this.updatePassword(event.target.value)}
									placeholder="Senha"
								/>
								<ErrorMessage text={errorPass} />
							</div>
							<div>
								<input
									style={{
										border: errorPassConfirm.length > 0 ? 'red' : 'transparent'
									}}
									className="input-login"
									type="password"
									value={passwordConfirmation}
									onChange={(event) => this.updatePasswordConfirmation(event.target.value)}
									placeholder="Confirme sua senha"
								/>
								<ErrorMessage text={errorPassConfirm} />
							</div>
							<div>
								<button className="social-login" style={{ backgroundColor: pink }} onClick={() => this.emailSignin()}>
									<p style={{ color: '#fff', fontWeight: 'bold' }}>Signin</p>
								</button>
								<button className="social-login" style={{ backgroundColor: google }} onClick={() => this.googleSignin()}>
									<p style={{ color: '#fff', fontWeight: 'bold' }}>Google</p>
								</button>
							</div>
							<div>
								<ErrorMessage text={errorCodeCreate} />
							</div>
						</div>)
					}

				</div>
			</div>
		)
	}
}

export default LoginPage;