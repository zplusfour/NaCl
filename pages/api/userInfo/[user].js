import Cookies from 'cookies';
import Gql from '../../utils/gql';

export default async function handler(req, res) {
	const cookies = new Cookies(req, res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const { user } = req.query;
	// const user = cookies.get('user') ? cookies.get('user') : null;

	if (sid === null) {
		res.status(401).json({ error: 'Please login first' });
	} else {
		const gql = new Gql(sid);
		const query = await gql.raw({
			query: `
        query {
          userByUsername(username: "${user}") {
            id username firstName lastName bio isVerified url image karma
          }
        }
      `
		});

		if (query.errors) {
			res.json(query);
		} else {
			res.json(query.data.userByUsername);
		}
	}
}
