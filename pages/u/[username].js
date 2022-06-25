/* eslint-disable @next/next/no-img-element */
import Cookies from 'cookies';

const Profile = ({ sid, user, userInfo }) => {
	console.log(userInfo);
	if (sid === null) {
		return <div>please login first</div>;
	} else {
		if (userInfo.errors) {
			return <div>{userInfo.errors[0].message}</div>;
		} else {
			return (
				<div className="replit-box">
					<header>
						<img
							src={userInfo.image}
							alt={userInfo.username + "'s profile picture."}
							style={{ borderRadius: '50%', height: 124, width: 120 }}
						/>
						<h1>
							{userInfo.firstName} {userInfo.lastName ? userInfo.lastName : ''}
						</h1>
					</header>
					&nbsp;
					<span style={{ color: 'gray' }}>
						@{userInfo.username} {`(${userInfo.karma})`}{' '}
						<span title={userInfo.isVerified ? 'Verified' : 'Not verified'}>
							{userInfo.isVerified ? '✔' : '❌'}
						</span>
					</span>
					<p>{userInfo.bio}</p>
				</div>
			);
		}
	}
};

export async function getServerSideProps(ctx) {
	const cookies = new Cookies(ctx.req, ctx.res);
	const user = ctx.params.username;
	const sid = cookies.get('connect.sid') ? cookies.get('connect.sid') : null;
	const r_userInfo = await fetch(`http://localhost:3000/api/userInfo/${user}`, {
		headers: { cookie: 'connect.sid=' + sid }
	});
	const userInfo = await r_userInfo.json();

	return {
		props: {
			sid,
			user,
			userInfo
		}
	};
}

export default Profile;
