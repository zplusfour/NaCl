import Cookies from 'cookies';

const Settings = ({ sid, user }) => {
	if (sid === null) {
		return <div>you are not logged in</div>;
	} else {
		return <div>coming soon</div>;
	}
};

export async function getServerSideProps(ctx) {
	const cookies = new Cookies(ctx.res, ctx.req);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const user = cookies.get('user') ? cookies.get('user') : null;

	return {
		props: {
			sid,
			user
		}
	};
}

export default Settings;
