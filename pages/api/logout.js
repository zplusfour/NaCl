import Cookies from 'cookies';

export default async function handler(req, res) {
	const cookies = new Cookies(req, res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;

	if (sid) {
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
	} else {
		res.status(401).send('you are not logged in lmao');
	}
}
