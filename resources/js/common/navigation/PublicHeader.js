// import libs
import React from "react";
import PropTypes from "prop-types";

// import components
import { Collapse } from "reactstrap";

// define component name
const displayName = "PublicHeader";

// validate properties
const propTypes = {
	showNavigation: PropTypes.bool.isRequired,
};

// initiate comppnent
const PublicHeader = ({ showNavigation }) => (
	<Collapse
		className="navbar-collapse navbar-dark"
		isOpen={showNavigation}
	></Collapse>
);

// bind properties
PublicHeader.displayName = displayName;
PublicHeader.propTypes = propTypes;

// export component
export default PublicHeader;
