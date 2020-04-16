// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import { jobListRequest, jobRemoveRequest } from "../../service";

// import components
import JobRow from "./components/JobRow";
import { Link } from "react-router-dom";

class Page extends Component {
	static displayName = "JobsPage";
	static propTypes = {
		meta: PropTypes.object.isRequired,
		jobs: PropTypes.array.isRequired,
		dispatch: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
	}

	UNSAFE_componentWillMount() {
		const { dispatch } = this.props;

		dispatch(jobListRequest());
	}

	handleRemove(id) {
		this.props.dispatch(jobRemoveRequest(id));
	}

	renderjobs() {
		return this.props.jobs.map((job, index) => {
			return (
				<JobRow
					key={index}
					job={job}
					index={index}
					handleRemove={this.handleRemove}
				/>
			);
		});
	}

	render() {
		return (
			<main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
				<h1>Jobs</h1>
				<table className="table table-responsive table-striped">
					<thead className="thead-inverse">
						<tr>
							<th>#</th>
							<th>Role</th>
							<th>JobInfo</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>
								<Link to="/jobs/create" className="btn btn-success">
									Add
								</Link>
							</th>
						</tr>
					</thead>
					<tbody>{this.renderjobs()}</tbody>
				</table>

				<div>
					<Link to="industries">
						<button className="btn btn-primary">Next</button>
					</Link>
				</div>
			</main>
		);
	}
}

export default Page;
