import Link from 'next/link';
import Cookies from 'cookies';
import Replcss from './replcss';
const Home = ({ sid, user }) => {
	if (sid === null) {
		return (
			<div>
				<Replcss />
				please <Link href="/login">login</Link>
			</div>
		);
	} else {
		return (
			<div>
				<Replcss />
				you are logged in as @{user}
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
export default Home;
