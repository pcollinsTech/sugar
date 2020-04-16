import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
const displayName = "JobRow";
const propTypes = {
	index: PropTypes.number.isRequired,
	job: PropTypes.object.isRequired,
	handleRemove: PropTypes.func.isRequired,
};

const JobRow = ({ index, job, handleRemove }) => {
	console.log("JOB", moment(job.startDate).format("MMMM, DD YYYY"));
	return (
		<tr key={index}>
			<th scope="row">{index + 1}</th>
			<td>{job.role}</td>
			<td>{job.jobInfo}</td>
			<td>{job.startDate && moment(job.startDate).format("MMMM, DD YYYY")}</td>
			<td>{job.endDate && moment(job.endDate).format("MMMM, DD YYYY")}</td>
			<td>
				<div className="btn-group" role="group" aria-label="Actions">
					<Link className="btn btn-primary" to={`jobs/${job.id}/edit`}>
						Edit
					</Link>
					<button
						className="btn btn-danger"
						onClick={() => handleRemove(job.id)}
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
};

JobRow.displayName = displayName;
JobRow.propTypes = propTypes;

export default JobRow;
