import React from 'react';
import './mainscreen.css';

interface Props {

}

interface State {

}

export default class MainScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Iniciando o App</p>
			</div>
		)
	}
}