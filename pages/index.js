import Link from 'next/link';
import Cookies from 'cookies';
const Home = ({ sid, user }) => {
	if (sid === null) {
		return (
			<div>
				please <Link href="/login">login</Link>
			</div>
		);
	} else {
		return <div>hi {user}</div>;
	}
};

export async function getServerSideProps(context) {
	const cookies = new Cookies(context.req, context.res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const user = cookies.get('user') ? cookies.get('user') : null;
	return {
		props: {
			sid,
			user
		}
	};
}
export default Home;
