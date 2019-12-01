import React from 'react';
import { connect } from 'react-redux';
import './mainscreen.css';

interface Props {
	user: any;
}

interface State {

}

class MainScreen extends React.Component<Props, State> {
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

const mapToProps = ({ user }: Props) => ({ user });

export default connect(mapToProps)(MainScreen);