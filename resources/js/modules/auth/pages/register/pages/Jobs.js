import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { jobAddRequest } from "../../../service";

import JobRow from "../components/JobRow";
import Job from "../../../Job";

export default function Jobs(props) {
	const [route, setRoute] = useState("index");
	const [job, setJob] = useState(new Job({}));

	const renderjobs = () => {
		return props.jobs.map((job, index) => {
			return (
				<JobRow
					key={index}
					job={job}
					index={index}
					handleRemove={this.handleRemove}
				/>
			);
		});
	};
	const handleChange = (name, value) => {
		setJob({ ...job, [name]: value });
	};

	const addJob = () => {
		setRoute("add");
	};

	const onSubmit = () => {
		this.props.dispatch(jobAddRequest(job)).catch(({ error, statusCode }) => {
			const { errors } = this.validator;

			if (statusCode === 422) {
				_.forOwn(error, (message, field) => {
					errors.add(field, message);
				});
			}

			this.setState({ errors });
		});
	};

	const handleEndDate = (date) => {
		setJob({ ...job, endDate: date });
	};
	const handleStartDate = (date) => {
		setJob({ ...job, startDate: date });
	};
	return (
		<div>
			{route === "index" && (
				<table className="table table-responsive table-striped">
					<thead className="thead-inverse">
						<tr>
							<th>#</th>
							<th>Role</th>
							<th>JobInfo</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>
								<button onClick={() => addJob()} className="btn btn-success">
									Add
								</button>
							</th>
						</tr>
					</thead>
					<tbody>{renderjobs()}</tbody>
				</table>
			)}
			{route === "add" && (
				<form onSubmit={(e) => onSubmit(e)}>
					<label htmlFor="role">Role</label>
					<div>
						<input
							type="text"
							id="role"
							name="role"
							className={`form-control`}
							placeholder="Role"
							value={job.role || ""}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
					</div>

					<label htmlFor="jobInfo">Job Details</label>
					<div>
						<textarea
							id="jobInfo"
							name="jobInfo"
							className={`form-control `}
							rows="3"
							placeholder="Description"
							value={job.jobInfo}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
						/>
					</div>

					<label>Start Date</label>
					<div>
						<DatePicker selected={job.startDate} onChange={handleStartDate} />
					</div>

					<label>End Date</label>
					<div>
						<DatePicker selected={job.endDate} onChange={handleEndDate} />
					</div>

					<div className="col-sm-10 ml-auto">
						<button type="submit" className="btn btn-primary">
							Update
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
