import { connect } from "react-redux";
import Job from "../../Job";

// import components
import Page from "./Page";

const mapStateToProps = () => {
	const job = new Job({});
	return {
		job,
	};
};

export default connect(mapStateToProps)(Page);
