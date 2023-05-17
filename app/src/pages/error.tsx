import React from "react";

import { ErrorBoundary } from "react-error-boundary";

const Error = () => {
	return (
		<>
			<ErrorBoundary fallback={<div>Something went wrong</div>}></ErrorBoundary>
		</>
	);
};

export default Error;
