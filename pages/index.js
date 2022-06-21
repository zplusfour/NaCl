import Link from 'next/link';
import Cookies from 'cookies';
import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

const Home = ({ sid, user, message, latestRepls }) => {
	if (!sid) {
		if (message) {
			return <div>{message}</div>;
		} else {
			return (
				<div>
					please <Link href="/login">login</Link>
				</div>
			);
		}
	} else {
		if (message) {
			return <div>{message}</div>;
		} else {
			return (
				<div>
					<h1>Welcome back, {user}!</h1>
					<br />
					<h3>Your latest repls: </h3>
					<br />
					<div style={{ display: 'flex', padding: 2, margin: 2 }}>
						{latestRepls.map((repl) => {
							return (
								<div key={repl} className="replit-box">
									<p>Title: {repl.title}</p>
									<p>Description: {repl.description ? repl.description : 'No description'}</p>
									<button className="btn-colored">Open editor</button>&nbsp;&nbsp;
									<button className="btn-negative">Delete</button>
								</div>
							);
						})}
					</div>
				</div>
			);
		}
	}
};

export async function getServerSideProps(ctx) {
	const cookies = new Cookies(ctx.req, ctx.res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const user = cookies.get('user') ? cookies.get('user') : null;
	const r_latestRepls = await fetch(`http://localhost:3000/api/latestRepls`, {
		headers: { cookie: `connect.sid=${sid}` }
	});
	const latestRepls = await r_latestRepls.json();
	if (latestRepls.error) {
		return {
			props: {
				sid,
				user,
				message: latestRepls.error
			}
		};
	}
	return {
		props: {
			sid,
			user,
			latestRepls
		}
	};
}
export default Home;
