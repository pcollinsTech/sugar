// import libs
import { connect } from "react-redux";
import Job from "../../Job";

// import components
import Page from "./Page";

const mapStateToProps = (state) => {
	const { data, ...meta } = state.jobs;

	return {
		jobs: data.map((job) => new Job(job)),
		meta: Object.assign({}, meta),
	};
};

export default connect(mapStateToProps)(Page);
