import { connect } from "react-redux";
import Job from "../../Job";

// import components
import Page from "./Page";

const mapStateToProps = (state, router) => {
	const { params } = router.match;
	const job = state.jobs.data.find((job) => job.id === Number(params.id));
	return {
		job: job ? new Job(job) : new Job({}),
	};
};

export default connect(mapStateToProps)(Page);
