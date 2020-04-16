// import lib
import { lazy } from "react";

export default [
	{
		path: "/jobs",
		exact: true,
		auth: true,
		component: lazy(() => import("./pages/list/index")),
	},
	{
		path: "/jobs/create",
		exact: true,
		auth: true,
		component: lazy(() => import("./pages/add/index")),
	},
	{
		path: "/jobs/:id/edit",
		exact: true,
		auth: true,
		component: lazy(() => import("./pages/edit/index")),
	},
];
