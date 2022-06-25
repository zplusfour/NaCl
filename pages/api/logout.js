import Cookies from 'cookies';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const cookies = new Cookies(req, res);
		cookies.set('connect.sid', '');
		cookies.set('user', '');

		res.status(200).redirect('/');
	} else {
		res.status(401).json({
			success: false,
			message: 'Method not allowed'
		});
	}
}
