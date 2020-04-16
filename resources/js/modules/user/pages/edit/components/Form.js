import React from "react";
import PropTypes from "prop-types";

const displayName = "UserFrom";
const propTypes = {
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

const Form = ({ user, errors, onChange, onSubmit }) => {
	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<div className="form-group row">
				<label htmlFor="firstName" className="col-sm-2 col-form-label">
					First Name
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						id="firstName"
						name="firstName"
						className={`form-control ${errors.has("firstName") &&
							"is-invalid"}`}
						placeholder="First Name"
						value={user.firstName || ""}
						onChange={(e) => onChange(e.target.name, e.target.value)}
					/>
					{errors.has("firstName") && (
						<div className="invalid-feedback">{errors.first("firstName")}</div>
					)}
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="lastName" className="col-sm-2 col-form-label">
					Last Name
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						id="lastName"
						name="lastName"
						className={`form-control ${errors.has("lastName") && "is-invalid"}`}
						placeholder="Last Name"
						value={user.lastName || ""}
						onChange={(e) => onChange(e.target.name, e.target.value)}
					/>
					{errors.has("lastName") && (
						<div className="invalid-feedback">{errors.first("lastName")}</div>
					)}
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="email" className="col-sm-2 col-form-label">
					Email
				</label>
				<div className="col-sm-10">
					<input
						type="email"
						id="email"
						name="email"
						className={`form-control ${errors.has("email") && "is-invalid"}`}
						placeholder="Email"
						value={user.email || ""}
						onChange={(e) => onChange(e.target.name, e.target.value)}
					/>
					{errors.has("email") && (
						<div className="invalid-feedback">{errors.first("email")}</div>
					)}
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
