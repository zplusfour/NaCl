import Link from 'next/link';
import Cookies from 'cookies';
import fetch from 'node-fetch';

const Home = ({ sid, user, latestRepls }) => {
	if (!sid) {
		return (
			<div>
				please <Link href="/login">login</Link>
			</div>
		);
	} else {
		return (
			<div>
				<div className="user-info">
					<h1>Welcome back, {user}!</h1>
					<div className="right">
						<form action="/api/logout" method="POST">
							<button type="submit" className="btn-negative">
								Log out
							</button>
						</form>
						<Link href="/account/settings">
							<button style={{ marginLeft: `${String(10)}px` }} className="btn-colored">
								Settings
							</button>
						</Link>
					</div>
				</div>
				<br />
				<h3>Your latest repls: </h3>
				<br />
				<div style={{ display: 'flex', padding: 2, margin: 2 }}>
					{latestRepls.map((repl) => {
						return (
							<div key={repl} className="replit-box">
								<p>
									<b>@{user}</b> <span style={{ color: 'gray' }}>/</span> <b>{repl.title}</b>
								</p>
								<p>{repl.description ? repl.description : 'No description'}</p>
								<button className="btn-colored">Open editor</button>&nbsp;&nbsp;
								<button className="btn-negative">Delete</button>
							</div>
						);
					})}
				</div>
				<script
					src="https://unpkg.com/react/umd/react.production.min.js"
					async
					crossOrigin=""
				></script>

				<script
					src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
					async
					crossOrigin=""
				></script>

				<script
					src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
					async
					crossOrigin=""
				></script>
			</div>
		);
	}
};

export async function getServerSideProps(ctx) {
	const cookies = new Cookies(ctx.req, ctx.res);
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const user = cookies.get('user') ? cookies.get('user') : null;

	if (sid && user) {
		const r_latestRepls = await fetch(`http://localhost:3000/api/latestRepls`, {
			headers: { cookie: `connect.sid=${sid}` }
		});
		const latestRepls = await r_latestRepls.json();
		return {
			props: {
				sid,
				user,
				latestRepls
			}
		};
	} else {
		return {
			props: {
				sid,
				user
			}
		};
	}
}
export default Home;
