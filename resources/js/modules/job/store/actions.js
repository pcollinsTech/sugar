/* ============
 * Actions for the JOB module
 * ============
 *
 * The actions that are available on the
 * JOB module.
 */

import { JOB_ADD, JOB_UPDATE, JOB_REMOVE, JOB_LIST } from "./action-types";

export function add(payload) {
	return {
		type: JOB_ADD,
		payload,
	};
}

export function update(payload) {
	return {
		type: JOB_UPDATE,
		payload,
	};
}

export function remove(payload) {
	return {
		type: JOB_REMOVE,
		payload,
	};
}

export function list(payload) {
	return {
		type: JOB_LIST,
		payload,
	};
}
