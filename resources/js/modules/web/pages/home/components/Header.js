import React from "react";

const displayName = "HomePageHeader";

function Header() {
	return (
		<header className="bg-primary text-white">
			<div className="container text-center">
				<h1>Please sign up</h1>
				<a href="/register">
					<button className="btn btn-success">Register</button>
				</a>
			</div>
		</header>
	);
}
Header.displayName = displayName;

export default Header;
