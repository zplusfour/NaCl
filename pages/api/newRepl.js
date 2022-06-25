import Cookies from 'cookies';
import Gql from '../utils/gql';

export default async function handler(req, res) {
	const cookies = new Cookies(req, res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;

	if (req.method === 'POST') {
		if (sid === null) {
			res.status(401).json({ error: 'Please login first.' });
		} else {
			const { title, language } = req.body;
			const gql = new Gql(sid);
			const query = await gql.raw({
				variables: { input: { title, language } },
				query: `mutation CreateRepl($input: CreateReplInput!) {
          createRepl(input: $input) {
            ...on Repl { id, url  }
            ...on UserError { message }
          }
        }`
			});

			res.redirect('/');
		}
	} else {
		res.status(401).json({ message: 'Method not allowed' });
	}
}
