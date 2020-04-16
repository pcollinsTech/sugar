import { JOB_ADD, JOB_UPDATE, JOB_REMOVE, JOB_LIST } from "./action-types";

const initialState = {
	currentPage: 0,
	data: [],
	from: 0,
	lastPage: 0,
	nextPageUrl: "",
	path: "",
	perPage: 0,
	prevPageUrl: null,
	to: 0,
	total: 0,
};

const reducer = (state = initialState, { type, payload = null }) => {
	switch (type) {
		case JOB_ADD:
			return add(state, payload);
		case JOB_UPDATE:
			return update(state, payload);
		case JOB_REMOVE:
			return remove(state, payload);
		case JOB_LIST:
			return list(state, payload);
		default:
			return state;
	}
};

function add(state, payload) {
	const job = state.data.find((job) => job.id === payload.id);

	if (!job) {
		const data = [...state.data, payload];

		return Object.assign({}, state, { data });
	}

	return update(state, payload);
}

function update(state, payload) {
	const data = state.data.map((obj) => {
		if (obj.id === payload.id) {
			return { ...obj, ...payload };
		}
		return obj;
	});

	return Object.assign({}, state, { data });
}

function remove(state, id) {
	const data = state.data.filter((obj) => obj.id !== id);

	return Object.assign({}, state, { data });
}

function list(state, payload) {
	state = Object.assign({}, payload);

	return state;
}

export default reducer;
