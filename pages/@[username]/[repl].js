// import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'cookies';

const Repl = ({ sid }) => {
	// const router = useRouter();
	if (sid === null) {
		return (
			<div>
				please <Link href="/login">login</Link>
			</div>
		);
	} else {
		// const { username, repl } = router.query;
		return <div>soon repl editor</div>;
	}
};

export async function getServerSideProps(context) {
	const cookies = new Cookies(context.req, context.res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	return {
		props: {
			sid
		}
	};
}
export default Home;
