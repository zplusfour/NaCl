const Login = () => {
	return (
		<div>
			<form action="/api/login" method="POST">
				username:
				<br />
				<input type="text" id="username" name="username" />
				<br />
				password:
				<br />
				<input type="password" id="password" name="password" />
				<br />
				<input type="submit" value="Login" />
			</form>
			<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
		</div>
	);
};

export default Login;
