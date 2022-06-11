import { login } from 'replit-login';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, password, captcha } = req.body;
		const { token } = await login(username, password, captcha);
		if (token === null) {
			res.statusCode = 401;
			res.end('could not login');
		} else {
			res.setHeader('Set-Cookie', [
				`connect.sid=${token}; Path=/; HttpOnly; Secure`,
				`user=${username}; Path=/; HttpOnly; Secure`
			]);
			// redirect to the home page
			res.redirect('/');
		}
	} else {
		res.status(405).json({
			success: false,
			message: 'Method not allowed'
		});
	}
}
