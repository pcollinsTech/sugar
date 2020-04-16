import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Postcoder from "react-address-lookup";
import DatePicker from "react-datepicker";

const displayName = "Details";

const propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	addressline1: PropTypes.string.isRequired,
	posttown: PropTypes.string.isRequired,
	postcode: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	handleDate: PropTypes.func.isRequired,
	setAddress: PropTypes.func.isRequired,
};

const Details = ({
	firstName,
	lastName,
	email,
	dateOfBirth,
	addressline1,
	posttown,
	postcode,
	errors,
	handleChange,
	next,
	handleDate,
	setAddress,
}) => {
	return (
		<>
			<h2 className="card-title">Sign up</h2>
			<div className="form-group">
				<input
					type="text"
					className={`form-control form-control rounded-0 ${errors.has(
						"firstName"
					) && "is-invalid"}`}
					name="firstName"
					id="firstName"
					placeholder="First Name"
					value={firstName || ""}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					required
					autoFocus
				/>
				{errors.has("firstName") && (
					<div className="invalid-feedback">{errors.first("firstName")}</div>
				)}
			</div>
			<div className="form-group">
				<input
					type="text"
					className={`form-control form-control rounded-0 ${errors.has(
						"lastName"
					) && "is-invalid"}`}
					name="lastName"
					id="lastName"
					placeholder="Last Name"
					value={lastName || ""}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					required
					autoFocus
				/>
				{errors.has("lastName") && (
					<div className="invalid-feedback">{errors.first("lastName")}</div>
				)}
			</div>
			<div className="form-group row">
				<label htmlFor="staticEmail" className="col-sm-6 col-form-label">
					Date Of Birth:
				</label>
				<div className="col-sm-6">
					<DatePicker selected={dateOfBirth} onChange={handleDate} />
				</div>
			</div>
			<div className="form-group">
				<input
					type="email"
					className={`form-control form-control rounded-0 ${errors.has(
						"email"
					) && "is-invalid"}`}
					name="email"
					id="email"
					placeholder="Email address"
					value={email || ""}
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					required
					autoFocus
				/>
				{errors.has("email") && (
					<div className="invalid-feedback">{errors.first("email")}</div>
				)}
			</div>
			{/* Need to remove Key to env file */}
			<Postcoder
				apiKey="PCWYJ-ZKRQQ-MVC32-JGJCH"
				addressSelectedCallback={setAddress}
			/>
			{addressline1 && (
				<>
					<div className="form-group mt-4">
						<input
							type="text"
							className="form-control form-control rounded-0"
							name="addressline1"
							id="addressline1"
							value={addressline1 || ""}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
							required
							autoFocus
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control form-control rounded-0"
							name="posttown"
							placeholder="City"
							id="posttown"
							value={posttown || ""}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
							required
							autoFocus
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control form-control rounded-0"
							name="postcode"
							placeholder="Postcode"
							id="postcode"
							value={postcode || ""}
							onChange={(e) => handleChange(e.target.name, e.target.value)}
							required
							autoFocus
						/>
					</div>
				</>
			)}

			<button className="btn btn-primary btn-block mt-3" onClick={() => next()}>
				Next
			</button>
		</>
	);
};

Details.displayName = displayName;
Details.propTypes = propTypes;

export default Details;
