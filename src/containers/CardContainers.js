import React from 'react';
import { connect  } from 'react-redux';

import Cards from './card';

function CardContainer () {
	return (
		<div>
			<Cards />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		orgDataQuality: state.testSuites.orgDataQuality
	};
};

export default connect(mapStateToProps)(CardContainer);