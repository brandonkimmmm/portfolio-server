import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import cookieCutter from 'cookie-cutter';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import UserForm from '../components/User/UserForm';

interface LoginValues {
	password: string;
}

const Dashboard: NextPage = (
	props: InferGetStaticPropsType<typeof getStaticProps>
) => {
	const [user, setUser] = useState(props.user);
	const [technologies, setTechnologies] = useState(props.technologies);
	const [projects, setProjects] = useState(props.projects);
	const [token, setToken] = useState(null);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showProjectModal, setShowProjectModal] = useState(false);
	const [showTechModal, setShowTechModal] = useState(false);

	useEffect(() => {
		(async () => {
			const token = cookieCutter.get('token');
			if (token) {
				const res = await fetch(
					`${process.env.API_URL}/auth/check-token`,
					{
						method: 'GET',
						headers: {
							authorization: `Bearer ${token}`
						}
					}
				);

				if (res.ok) {
					setToken(token);
				} else {
					cookieCutter.set('token', null, { expires: new Date(0) });
				}
			}
		})();
	});

	const handleLogin = async (password: string) => {
		const res = await fetch(`${process.env.API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: user.email,
				password
			})
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message);
		}

		cookieCutter.set('token', data.access_token);
		setToken(data.access_token);
	};

	return (
		<>
			{token ? (
				<div className='grid grid-cols-2 gap-6'>
					<div
						className={`modal ${
							showUserModal ? 'modal-open' : null
						}`}
					>
						<div className='modal-box'>
							<UserForm
								handleShow={setShowUserModal}
								user={user}
								setUser={setUser}
								token={token}
							/>
						</div>
					</div>
					<div className='my-6 indicator h-full w-full'>
						<div className='indicator-item indicator-top'>
							<button
								className='btn btn-primary btn-xs'
								onClick={() => setShowUserModal(true)}
							>
								Edit
							</button>
						</div>
						<div className='flex flex-col w-full h-full shadow bg-blue-400 rounded-box p-4'>
							<div className='uppercase font-bold text-2xl'>
								User Info
							</div>
							{Object.entries(user).map(([key, value]) => (
								<div key={key}>{`${key.toUpperCase()}: ${
									key === 'link_urls'
										? JSON.stringify(value, null, 4)
										: value
								}`}</div>
							))}
						</div>
					</div>
					<div className='my-6 indicator h-full w-full'>
						<div className='indicator-item indicator-top'>
							<button className='btn btn-success btn-xs'>
								Add
							</button>
						</div>
						<div className='grid grid-cols-2 bg-blue-400 h-full w-full rounded-box p-4'>
							<div className='uppercase font-bold text-2xl col-span-full'>
								Technologies
							</div>
							{technologies.map((tech) => (
								<div
									key={tech.id}
									className='flex flex-col p-4'
								>
									{Object.entries(tech).map(
										([key, value]) => (
											<div
												key={key}
											>{`${key.toUpperCase()}: ${
												key === 'projects'
													? JSON.stringify(
															value,
															null,
															4
													  )
													: value
											}`}</div>
										)
									)}
								</div>
							))}
						</div>
					</div>
					<div className='col-span-2 my-6 indicator h-full w-full'>
						<div className='indicator-item indicator-top'>
							<button className='btn btn-success btn-xs'>
								Add
							</button>
						</div>
						<div className='grid grid-cols-2 bg-blue-400 h-full w-full rounded-box p-4'>
							<div className='uppercase font-bold text-2xl col-span-full'>
								Projects
							</div>
							{projects.map((project) => (
								<div
									key={project.id}
									className='flex flex-col p-4'
								>
									{Object.entries(project).map(
										([key, value]) => (
											<div
												key={key}
											>{`${key.toUpperCase()}: ${
												key === 'technologies'
													? JSON.stringify(
															value,
															null,
															4
													  )
													: value
											}`}</div>
										)
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className='p-10 card bg-base-200'>
					<Formik
						initialValues={{
							password: ''
						}}
						onSubmit={async (
							values: LoginValues,
							{ setSubmitting }: FormikHelpers<LoginValues>
						) => {
							try {
								await handleLogin(values.password);
								alert('Welcome back!');
							} catch (err) {
								alert(err.message);
							}
							setSubmitting(false);
						}}
					>
						<Form className='form-control'>
							<Field
								className='input'
								id='password'
								name='password'
								placeholder='Password'
								type='password'
							/>

							<button type='submit' className='btn btn-primary'>
								Login
							</button>
						</Form>
					</Formik>
				</div>
			)}
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const userRes = await fetch(`${process.env.API_URL}/user`);
	const user = await userRes.json();

	const projectsRes = await fetch(`${process.env.API_URL}/projects`);
	const projects = await projectsRes.json();

	const technologiesRes = await fetch(`${process.env.API_URL}/technologies`);
	const technologies = await technologiesRes.json();

	return {
		props: {
			user,
			projects,
			technologies
		}
	};
};

export default Dashboard;
