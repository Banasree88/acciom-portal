import React from 'react';
import { connect  } from 'react-redux';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainers';
import TimeLineComponent from './Timeline';
import DQIContainer from './DQIContainer';
import { getOrgDataQuality } from '../actions/dashboardActions';

const loadDashBoardData = (props) => {
	props.getOrgDataQuality();
};

class Dashboard extends React.Component {
	
	componentDidMount() {
		console.log('Dashboard.componentDidMount() ===>');
		loadDashBoardData(this.props);
	}

	render() {
		return (
			<div>
				<CardContainer />
				<TimeLineComponent />
				< DQIContainer />
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	getOrgDataQuality: () => dispatch(getOrgDataQuality())
})

export default connect(
	null,
	mapDispatchToProps
) (Dashboard);