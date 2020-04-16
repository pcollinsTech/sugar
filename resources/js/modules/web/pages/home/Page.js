import React, { Component } from "react";
import PropTypes from "prop-types";

// import components
import Header from "./components/Header";

// import services
import { jobListRequest } from "../../../job/service";

class Page extends Component {
	static displayName = "HomePage";
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.dispatch(jobListRequest());
	}

	render() {
		console.log("PROPS", this.props);
		return (
			<div>
				<Header />
			</div>
		);
	}
}

export default Page;
