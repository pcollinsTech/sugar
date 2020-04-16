//import libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import _ from "lodash";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { register } from "../../service";
import ReeValidate from "ree-validate";
// import components
import Details from "./pages/Details";
import Password from "./pages/Password";

// initialize component
class Page extends Component {
	static displayName = "RegisterPage";
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		dispatch: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.validator = new ReeValidate({
			firstName: "required|min:3",
			lastName: "required|min:6",
			addressline1: "required|min:6",
			email: "required|email",
			dateOfBirth: "required|min:6",
			password: "required|min:6",
			// 	"regex :^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
			passwordConfirmation: "required|min:6",
		});

		this.state = {
			detailsPage: true,
			passwordPage: false,
			jobsPage: false,
			industriesPage: false,
			reviewPage: false,
			jobs: [],
			credentials: {
				firstName: "",
				lastName: "",
				email: "",
				dateOfBirth: "",
				password: "",
				addressline1: "",
				posttown: "",
				postcode: "",

				passwordConfirmation: "",
			},
			errors: this.validator.errors,
			fields: this.validator.fields,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.next = this.next.bind(this);
		this.setAddress = this.setAddress.bind(this);
	}

	componentDidMount() {
		$("body").attr("style", "background-color: #eee");
	}

	componentWillUnmount() {
		$("body").removeAttr("style");
	}

	setAddress(addr) {
		this.setState({
			credentials: {
				...this.state.credentials,
				addressline1: addr.addressline1,
				posttown: addr.posttown,
				county: addr.county,
				postcode: addr.postcode,
			},
		});
	}
	next = () => {
		this.setState({
			...this.state,
			detailsPage: false,
			passwordPage: true,
		});
	};

	handleDate = (date) => {
		console.log("DATE", date);
		this.setState({
			credentials: {
				...this.state.credentials,
				dateOfBirth: date,
			},
		});
	};
	// event to handle input change
	handleChange(name, value) {
		const { errors } = this.validator;

		this.setState({
			credentials: { ...this.state.credentials, [name]: value },
		});
		errors.remove(name);

		this.validator.validate(name, value).then(() => {
			this.setState({ errors });
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { credentials } = this.state;
		const { errors } = this.validator;
		credentials.dateOfBirth = moment(credentials.dateOfBirth).format(
			"dd/mm/YYYY"
		);
		this.validator.validateAll(credentials).then((success) => {
			if (success) {
				console.log("HI", credentials);
				this.submit(credentials);
			} else {
				this.setState({ errors });
			}
		});
	}

	submit(credentials) {
		this.props
			.dispatch(register(credentials))
			.catch(({ error, statusCode }) => {
				const { errors } = this.validator;

				if (statusCode === 422) {
					_.forOwn(error, (message, field) => {
						errors.add(field, message);
					});
				} else if (statusCode === 401) {
					errors.add("password", error);
				}

				this.setState({ errors });
			});
	}

	render() {
		// check if user is authenticated then redirect him to home page
		if (this.props.isAuthenticated) {
			return <Redirect to="/jobs" />;
		}
		console.log("Props", this.props);
		const {
			detailsPage,
			passwordPage,
			credentials: {
				firstName,
				lastName,
				email,
				dateOfBirth,
				addressline1,
				posttown,
				postcode,
				password,
				passwordConfirmation,
			},
		} = this.state;
		const props = {
			firstName,
			lastName,
			email,
			dateOfBirth,
			addressline1,
			posttown,
			postcode,
			password,
			passwordConfirmation,
			errors: this.state.errors,
			handleChange: this.handleChange,
			handleSubmit: this.handleSubmit,
			handleDate: this.handleDate,
			setAddress: this.setAddress,
			next: this.next,
		};

		return (
			<div className="container py-5">
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="mx-auto">
								<span className="anchor" />
								<div className="card has-shadow">
									<div className="card-body">
										<form
											className="form"
											role="form"
											onSubmit={this.handleSubmit}
											noValidate
										>
											{detailsPage && <Details {...props} />}
											{passwordPage && <Password {...props} />}
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Page;
