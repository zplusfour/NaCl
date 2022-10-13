import Cookies from 'cookies';
import Gql from '../utils/gql';

export default async function handler(req, res) {
	const cookies = new Cookies(req, res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;

	if (sid === null) {
		res.status(401).json({ error: 'Please login first' });
	} else {
		const gql = new Gql(sid);
		const query = await gql.raw({
			variables: { count: 3 },
			query: `query recentRepls($count: Int!) { recentRepls(count: $count) { title description language } }
			`
		});
		const jsonRet = query.data.recentRepls;

		res.status(200).json(jsonRet);
	}
}
