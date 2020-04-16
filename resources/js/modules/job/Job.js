import Model from "../../utils/Model";
import User from "../user/User";

class Job extends Model {
	constructor(props) {
		super(props);

		this.initialize(props);
	}

	initialize(props) {
		super.initialize(props);

		this.startDate = props.startDate || "";
		this.endDate = props.endDate || "";
		this.jobInfo = props.jobInfo || "";
		this.role = props.role || "";

		this.user = props.user ? new User(props.user) : null;
	}
}

export default Job;
