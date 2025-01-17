import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';

import { logoutFromPortal } from '../actions/loginActions';
import logo from '../assets/images/logo.jpeg';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		height: `70px`
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	loginbtn : {
		position: 'absolute',
		right: '20px',
		color: '#3b6d9e',
		fontSize: '16px'
	},
  	dashboard : {
		color: 'white'
	},
	home : {
		color: 'white'
	},
	startup : {
		color: 'white'
	},
	acciom : {
		color: 'cadetblue'
	},
	acciomimg : {
		width: '70px'
	}
}));

// function HomeIcon(props) {
// 	return (
// 		<SvgIcon {...props}>
// 			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
// 		</SvgIcon>
// 	);
// }

const getLoginOptions = (props, classes) => {
	let options = null;
	if (props.loginData && props.loginData.token) {
		// options = <Link to='/login' className={classes.loginbtn}>Login</Link>;
		options = <div id="logoutLink" className={classes.loginbtn} onClick={(event) => { event.preventDefault(); props.logoutFromPortal() }}>Logout</div>;
	} else {
		options = <Link id="loginLink" to='/login' className={classes.loginbtn}>Login</Link>;
	}
	return options;
};

function NavigationBar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuIcon />
					</IconButton>
					<img className="logo" src={logo} alt="logo" />
					<div className="loginOptions">
						{ getLoginOptions(props, classes) }
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
				open={open} >
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<MenuList className="sideNavBar">
						<MenuItem>
							<ListItemIcon>
								{/* <HomeIcon className={classes.icon} color="primary" /> */}
								<Link to= {'/dashboard'} color= 'primary' >
									<Icon className={clsx(classes.icon, 'fas fa-business-time fa-2x')} color="primary" />	
								</Link>
							</ListItemIcon>
							{/* <Link to={`/dashboard`}> Dashboard </Link> <br /> */}
							<Link to={`/dashboard`} className = {classes.dashboard}> Dashboard </Link> <br />
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<Link to={`/home`} className = {classes.home}>
									<Icon className={clsx(classes.icon, 'fas fa-upload fa-2x')} color="primary" />  
								</Link> 
							</ListItemIcon>
							<Link to={`/home`} className = {classes.home}> Upload Test Suites </Link> <br />
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<Link to ={`/startup`} className = {classes.startup}>
									<Icon className={clsx(classes.icon, 'fas fa-list-alt fa-2x')} color="primary" />
								</Link>
							</ListItemIcon>
							<Link to={`/startup`} className = {classes.startup}>Test Suites</Link>
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<Link to ={`/view_db_details`} className = {classes.startup}>
									<Icon className={clsx(classes.icon, 'fas fa-database fa-2x')} color="primary" />
								</Link>
							</ListItemIcon>
							<Link to={`/view_db_details`} className = {classes.startup}>View DB Details</Link>
						</MenuItem>
					</MenuList>
				</List>
			</Drawer>
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log("Navbar mapStateToProps()", state);
	return {
		loginData: state.loginData
	}
};
const mapDispatchToProps = (dispatch) => ({
	logoutFromPortal: () => dispatch(logoutFromPortal())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);