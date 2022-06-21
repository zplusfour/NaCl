import Cookies from 'cookies';
import { useEffect, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Login = ({ sid, user }) => {
	const [token, setToken] = useState('');
	useEffect(() => {
		if (token) {
			console.log('token:', token);
		}
	}, [token]);
	if (sid) {
		return <div>you are logged in, {user}</div>;
	} else {
		return (
			<div style={{ textAlign: 'center' }}>
				<form
					action="/api/login"
					method="POST"
					className="replit-box"
					style={{ display: 'inline-block' }}
				>
					<br />
					<input type="text" id="username" name="username" placeholder="Username" />
					<br />
					<br />
					<input type="password" id="password" name="password" placeholder="Password" />
					<br />
					<br />

					<HCaptcha
						sitekey="473079ba-e99f-4e25-a635-e9b661c7dd3e"
						onVerify={(token) => {
							setToken(token);
						}}
						onExpire={() => setToken('')}
					/>
					<input value={token} style={{ display: 'none' }} id="captcha" name="captcha" />
					<br />
					<button type="submit" style={{ cursor: 'pointer' }}>
						Login
					</button>
				</form>
			</div>
		);
	}
};

export async function getServerSideProps(ctx) {
	const cookies = new Cookies(ctx.req, ctx.res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const user = cookies.get('user') ? cookies.get('user') : null;
	return {
		props: {
			sid,
			user
		}
	};
}

export default Login;
