import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component {

	render() {
		return (
			<div className="container home-container">
				<h2>Wellcome to Reactibook</h2>
				<h5>En asociación con Laboratoria</h5>

				<p>Login to your account to use it</p>
				<Link to="/login">Login page</Link>
			</div>
		)
	}
}