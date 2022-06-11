import Link from 'next/link';

const User = ({ sid }) => {
	if (sid === null) {
		return (
			<div>
				please <Link href="/login">login</Link>
			</div>
		);
	} else {
		return <div>user profile soon</div>;
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
