import { useState, useEffect } from "react";
import { Button } from "antd";
function Login() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});
	return (
		<div>
			<p>You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>Click me</Button>
		</div>
	);
}
export default Login;
