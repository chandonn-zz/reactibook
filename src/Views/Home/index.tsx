import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import {
	pink
} from '../../Resources/colors';

export default class Home extends Component {

	render() {
		return (
			<div className="container home-container">
				<h1>Wellcome to Reactibook</h1>
				<h5 style={{ color: pink }}>Hecho por Alexandre en asociación con Laboratoria</h5>

				<p>Login to your account and use it</p>

				<Link className="btn btn-outline-dark" to="/login">Login page</Link>
			</div>
		)
	}
}