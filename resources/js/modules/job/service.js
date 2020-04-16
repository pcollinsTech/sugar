import Http from "../../utils/Http";
import Transformer from "../../utils/Transformer";
import * as jobActions from "./store/actions";

function transformRequest(parms) {
	return Transformer.send(parms);
}

function transformResponse(params) {
	return Transformer.fetch(params);
}

export function jobAddRequest(params) {
	return (dispatch) =>
		new Promise((resolve, reject) => {
			Http.post("/jobs", transformRequest(params))
				.then((res) => {
					dispatch(jobActions.add(transformResponse(res.data)));
					return resolve();
				})
				.catch((err) => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};

					if (statusCode === 422) {
						const resetErrors = {
							errors: err.response.data,
							replace: false,
							searchStr: "",
							replaceStr: "",
						};
						data.error = Transformer.resetValidationFields(resetErrors);
					} else if (statusCode === 401) {
						data.error = err.response.data.message;
					}
					return reject(data);
				});
		});
}

export function jobUpdateRequest(params) {
	return (dispatch) =>
		new Promise((resolve, reject) => {
			Http.patch(`jobs/${params.id}`, transformRequest(params))
				.then((res) => {
					dispatch(jobActions.add(transformResponse(res.data)));
					return resolve();
				})
				.catch((err) => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};

					if (statusCode === 422) {
						const resetErrors = {
							errors: err.response.data,
							replace: false,
							searchStr: "",
							replaceStr: "",
						};
						data.error = Transformer.resetValidationFields(resetErrors);
					} else if (statusCode === 401) {
						data.error = err.response.data.message;
					}
					return reject(data);
				});
		});
}

export function jobRemoveRequest(id) {
	return (dispatch) => {
		Http.delete(`jobs/${id}`)
			.then(() => {
				dispatch(jobActions.remove(id));
			})
			.catch((err) => {
				// TODO: handle err
				console.error(err.response);
			});
	};
}

export function jobListRequest() {
	return (dispatch) => {
		Http.get("/jobs")
			.then((res) => {
				dispatch(jobActions.list(transformResponse(res.data)));
			})
			.catch((err) => {
				// TODO: handle err
				console.error(err.response);
			});
	};
}

export function jobEditRequest(id) {
	return (dispatch) => {
		Http.get(`jobs/${id}`)
			.then((res) => {
				dispatch(jobActions.add(transformResponse(res.data)));
			})
			.catch((err) => {
				// TODO: handle err
				console.error(err.response);
			});
	};
}

export function jobFetchRequest(slug) {
	return (dispatch) => {
		Http.get(`jobs/published/${slug}`)
			.then((res) => {
				dispatch(jobActions.add(transformResponse(res.data)));
			})
			.catch((err) => {
				// TODO: handle err
				console.error(err.response);
			});
	};
}
