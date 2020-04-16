// import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { jobAddRequest } from "../../service";
import ReeValidate from "ree-validate";
import { Redirect } from "react-router-dom";
import moment from "moment";
// import components
import Form from "./components/Form";

class Page extends Component {
	static displayName = "AddJob";
	static propTypes = {
		job: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.validator = new ReeValidate({
			role: "required|min:3",
			jobInfo: "required|min:10",
		});

		const job = this.props.job.toJson();

		this.state = {
			job,
			errors: this.validator.errors,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEndDate = this.handleEndDate.bind(this);
		this.handleStartDate = this.handleStartDate.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const job = nextProps.job.toJson();

		if (!_.isEqual(this.state.job, job)) {
			this.setState({ job });
		}
	}

	handleEndDate = (date) => {
		this.setState({
			job: {
				...this.state.job,
				endDate: date,
			},
		});
	};
	handleStartDate = (date) => {
		this.setState({
			job: {
				...this.state.job,
				startDate: date,
			},
		});
	};
	handleChange(name, value) {
		const { errors } = this.validator;

		this.setState({ job: { ...this.state.job, [name]: value } });

		errors.remove(name);

		this.validator.validate(name, value).then(() => {
			this.setState({ errors });
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const job = this.state.job;
		const { errors } = this.validator;
		this.validator.validateAll(job).then((success) => {
			if (success) {
				console.log("JOB", job);
				this.submit(job);
			} else {
				this.setState({ errors });
			}
		});
	}

	submit(job) {
		this.props.dispatch(jobAddRequest(job)).catch(({ error, statusCode }) => {
			const { errors } = this.validator;

			if (statusCode === 422) {
				_.forOwn(error, (message, field) => {
					errors.add(field, message);
				});
			}

			this.setState({ errors });
		});
		return <Redirect to="/jobs" />;
	}

	render() {
		return (
			<div className="col-sm-9 ml-sm-auto col-md-10 pt-3">
				<h1>Create</h1>
				<Form
					{...this.state}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					handleStartDate={this.handleStartDate}
					handleEndDate={this.handleEndDate}
				/>
			</div>
		);
	}
}

export default Page;
