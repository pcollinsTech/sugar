import React from "react";
import PropTypes from "prop-types";

const displayName = "Password";

const propTypes = {
	password: PropTypes.string.isRequired,
	passwordConfirmation: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

const Password = ({
	password,
	passwordConfirmation,
	errors,
	next,
	handleChange,
	handleSubmit,
}) => {
	return (
		<>
			<h2 className="card-title">Password</h2>
			<div className="form-group mt-2">
				<label htmlFor="password" className="sr-only">
					Password
				</label>
				<input
					type="password"
					className={`form-control form-control rounded-0 ${errors.has(
						"password"
					) && "is-invalid"}`}
					id="password"
					name="password"
					placeholder="Password"
					value={password || ""}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					required
				/>
				{errors.has("password") && (
					<div className="invalid-feedback">{errors.first("password")}</div>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="passwordConfirmation" className="sr-only">
					Confirm Password
				</label>
				<input
					type="password"
					className={`form-control form-control rounded-0 ${errors.has(
						"passwordConfirmation"
					) && "is-invalid"}`}
					id="passwordConfirmation"
					name="passwordConfirmation"
					placeholder="Confirm Password"
					value={passwordConfirmation || ""}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					required
				/>
				{errors.has("passwordConfirmation") && (
					<div className="invalid-feedback">
						{errors.first("passwordConfirmation")}
					</div>
				)}
			</div>
			<button
				className="btn btn-primary btn-block mt-3"
				type="submit"
				onClick={() => next()}
			>
				Next
			</button>
		</>
	);
};

Password.displayName = displayName;
Password.propTypes = propTypes;

export default Password;
