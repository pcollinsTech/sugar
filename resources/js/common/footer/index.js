import React from "react";
import moment from "moment";

const Footer = () => (
	<footer className="sticky-bottom py-3 bg-dark">
		<div className="container">
			<p className="m-0 text-center text-white">
				Copyright ©{" "}
				<a href="https://pcollins.tech" target="__blank">
					{" "}
					pcollins.tech
				</a>{" "}
				{moment().format("YYYY")}
			</p>
		</div>
	</footer>
);

export default Footer;
