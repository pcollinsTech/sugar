// import lib
import { lazy } from "react";

const routes = [
	{
		path: "/",
		exact: true,
		component: lazy(() => import("./pages/home/index")),
	},
];

export default routes;
