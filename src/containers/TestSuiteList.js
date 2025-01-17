import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Table } from 'react-bootstrap';
import ManageConnection from '../components/ManageConnection';
import ViewLogs from '../components/ViewLogs';
import ViewTestCase from '../components/ViewTestCase';

import { getAllConnections, getTestCases, testCaseLogs } from '../actions/testSuiteListActions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '33.33%',
		color: theme.palette.text.secondary,
	},
	subHeading: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '40%',
		flexShrink: 0,
	},
	suiteID: {
		fontSize: theme.typography.pxToRem(13),
		fontWeight: 'bold',
		flexBasis: '18.33%',
		flexShrink: 0,
	},
	manageConnection: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '23.33%',
		color: 'brown',
	},
	rcorners: {
		border: '2px solid',
		padding: '20px',
		width: '580px',
		borderRadius: '25px',
		boxShadow: '4px',
	},
	viewConnection: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '18.33%',
		flexShrink: 0,
		color: 'brown',
	},
	status: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '18.33%',
		flexShrink: 0,
		fontWeight: 'bold'
	},
	statusImg: {flexBasis: '20%'},
	noRecord: {color: 'red', textAlign: 'center'},
	innerPanelWidth: {width:'1080px'},
	statusBg: {
		fontSize: theme.typography.pxToRem(13),
		color: 'green',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgBlue: {
		fontSize: theme.typography.pxToRem(13),
		color: 'blue',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgRed: {
		fontSize: theme.typography.pxToRem(13),
		color: 'red',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	statusBgOrange: {
		fontSize: theme.typography.pxToRem(13),
		color: '#F7861B',
		fontWeight: 'bold',
		flexBasis: '18.33%',
	},
	executionWidth: {width: '20%'},
	caseLog: {cursor: 'pointer'},
}));


function ControlledExpansionPanels({ testSuites, getAllConnections, testCaseLogs, getTestCases}) {
	console.log('ControlledExpansionPanels constructor');
	const testSuiteDataLen = testSuites && testSuites.suites ? Object.keys(testSuites.suites).length : 0;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);	
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleManageConnection = (e) => {
		console.log('handleManageConnection ===>');
		getAllConnections();
		e.stopPropagation();
	};

	const viewTestCase = (e) => {
		console.log('viewTestCase ===>');
		getTestCases();
		e.stopPropagation();
	};

	const viewTestCaseLogs = (e) => {
		console.log('viewTestCaseLogs ===>');
		testCaseLogs();
	};

	const renderTestName = (status) => {
		switch(status) {
		case 0:
			return classes.statusBgBlue;
		case 1:
			return classes.statusBg;
		case 2:
			return classes.statusBgRed;
		case 3:
			return classes.statusBgOrange;
		case 4:
			return classes.statusBgRed;
		default:
			return '';
		}
	};

	const renderTestStatus = (status) => {
		switch(status) {
		case 0:
			return 'New';
		case 1:
			return <i className="fas fa-check-circle statusCheckIcon" aria-hidden="true"></i>;
		case 2:
			return <i className="fas fa-times-circle statusDelIcon" aria-hidden="true"></i>;
		case 3:
			return <i className="fas fa-stopwatch statusStopIcon" aria-hidden="true"></i>;
		default:
			return '';
		}
	};

	const renderExecutionStatus = (status) => {
		let labelColor, label = '';
		switch(status) {
		case 0:
			labelColor = 'blue';
			label = 'New';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 1:
			labelColor = 'green';
			label = 'Pass';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 2:
			labelColor = 'red';
			label = 'Fail';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 3:
			labelColor = '#f3a563';
			label = 'In Progress';
			return <label style={{ color: labelColor }}>{label}</label>;
		case 4:
			labelColor = 'red';
			label = 'Error';
			return <label style={{ color: labelColor }}>{label}</label>;
		default:
			labelColor = '';
			label = '';
			return <label style={{ color: labelColor }}>{label}</label>;				
		}
	};

	return (
		<div className={classes.root}>
			{ 
				(testSuiteDataLen > 0 && testSuites.suites && testSuites.suites.test_suite_data) ?
				testSuites.suites.test_suite_data.map(testSuite => (
					<ExpansionPanel key={testSuite.test_suite_id} expanded={expanded === testSuite.test_suite_id} onChange={handleChange(testSuite.test_suite_id)}>
						
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header">
							<Typography className={classes.heading}>{testSuite.test_suite_name}</Typography>
							<Typography className={classes.manageConnection} onClick={e => handleManageConnection(e, getAllConnections)}>Manage Connections</Typography>
							<Typography className={classes.suiteID}>SuiteID:{testSuite.test_suite_id}</Typography>
							<Typography className={classes.secondaryHeading}>Uploaded at:  {testSuite.created}</Typography>
							<i className="fa fa fa-play statusPlayIcon" aria-hidden="true"></i>
						</ExpansionPanelSummary>

						<ExpansionPanelDetails>
							<div className={classes.innerPanelWidth}>
								{ testSuite.test_case_list.map(testCaseList => (
									<ExpansionPanel key={testCaseList.test_case_id}>

										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography className={classes.subHeading}>{testCaseList.test_id}</Typography>
											<Typography className={classes.viewConnection} onClick={e => viewTestCase(e, getTestCases)}>View</Typography>
											<Typography className={classes.status}>Status&nbsp;&nbsp;&nbsp;{renderTestStatus(testCaseList.test_status)}</Typography>
											<Typography className={renderTestName(testCaseList.test_status)}>{testCaseList.test_name}</Typography>
											<Typography><i className="fa fa fa-play statusPlayIcon" aria-hidden="true"></i></Typography>
										</ExpansionPanelSummary>
										
										<ExpansionPanelDetails>
										<div>
											    <Table striped bordered hover size="sm" id="RoundedTable">
												  <thead>
													<tr>
													  {/* <th className="testLogHeading">Run ID</th> */}
													  <th className="testLogHeading">Execution Status</th>
													  <th className="testLogHeading">Execution At</th>
													  <th className="testLogHeading">Logs</th>	
													</tr>
												  </thead>
												  <tbody>
													{ testCaseList.test_case_log.map(testCaseLog => (
														<tr key={testCaseLog.test_case_log_id}>
														  {/* <td className="testLogData"></td> */}
														  <td className="testLogData">{renderExecutionStatus(testCaseLog.test_execution_status)}</td>
														  <td className="testLogData">{testCaseLog.executed_at}</td>
														  <td className={classes.caseLog} onClick={e => viewTestCaseLogs(e, testCaseLogs)}><i className="far fa-sticky-note logsIcon"></i></td>
														</tr>
													))}
												  </tbody>
											    </Table>
											</div>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								)) }
							</div>
						</ExpansionPanelDetails>

					</ExpansionPanel>
				)) : null
				}
				<ManageConnection></ManageConnection>
				<ViewTestCase></ViewTestCase>
				<ViewLogs></ViewLogs>				
		</div>
	);
};

const mapStateToProps = function (state) {
	console.log("TestSuiteList.state", state);
	return {
		testSuites: state.testSuites.testSuiteList
	}
};

export default connect(mapStateToProps, {
	getAllConnections, testCaseLogs, getTestCases
})(ControlledExpansionPanels);