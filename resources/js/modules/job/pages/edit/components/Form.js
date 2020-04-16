import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

const displayName = "JobFrom";
const propTypes = {
	job: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleStartDate: PropTypes.func.isRequired,
	handleEndDate: PropTypes.func.isRequired,
};

const Form = ({
	job,
	errors,
	onChange,
	onSubmit,
	handleStartDate,
	handleEndDate,
}) => {
	function handleChange(name, value) {
		if (value !== job[name]) {
			onChange(name, value);
		}
	}

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<div className="form-group row">
				<label htmlFor="role" className="col-sm-2 col-form-label">
					Role
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						id="role"
						name="role"
						className={`form-control ${errors.has("role") && "is-invalid"}`}
						placeholder="Role"
						value={job.role || ""}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
					{errors.has("role") && (
						<div className="invalid-feedback">{errors.first("role")}</div>
					)}
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="jobInfo" className="col-sm-2 col-form-label">
					Description
				</label>
				<div className="col-sm-10">
					<textarea
						id="jobInfo"
						name="jobInfo"
						className={`form-control ${errors.has("jobInfo") && "is-invalid"}`}
						rows="3"
						placeholder="Description"
						value={job.jobInfo}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
					{errors.has("jobInfo") && (
						<div className="invalid-feedback">{errors.first("jobInfo")}</div>
					)}
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">Start Date</label>
				<div className="col-sm-10">
					<DatePicker selected={job.startDate} onChange={handleStartDate} />
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">End Date</label>
				<div className="col-sm-10">
					<DatePicker selected={job.endDate} onChange={handleEndDate} />
				</div>
			</div>
			<div className="form-group row">
				<div className="col-sm-10 ml-auto">
					<button
						disabled={errors.any()}
						type="submit"
						className="btn btn-primary"
					>
						Update
					</button>
				</div>
			</div>
		</form>
	);
};

Form.displayName = displayName;
Form.propTypes = propTypes;

export default Form;
