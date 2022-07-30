import { Stack, Typography, Grid, styled } from '@mui/material';
import type { NextComponentType } from 'next';
import SectionContainer from '../../components/SectionContainer';
import { RiUser6Line } from 'react-icons/ri';
import TechItem from './TechItem';
import data from './data';

const StyledUserIcon = styled(RiUser6Line)({});

const About: NextComponentType = () => {
	return (
		<SectionContainer title='About'>
			<Grid container columnSpacing={5}>
				<Grid item xs={6}>
					<Stack sx={{ width: 'auto' }} rowGap={1}>
						<StyledUserIcon
							size={200}
							sx={{ mx: 'auto', color: 'primary.main' }}
						/>
						<Typography variant='h6'>
							Software developer with a passion for consistently
							improving as a programmer. Highly motivated and
							disciplined individual with a strong work-ethic.
						</Typography>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Grid
						container
						justifyContent='center'
						alignItems='center'
						columnSpacing={2}
					>
						<Grid item xs={4}>
							<Stack rowGap={2}>
								{data.slice(0, 3).map((tech) => (
									<TechItem key={tech} tech={tech} />
								))}
							</Stack>
						</Grid>
						<Grid item xs={4}>
							<Stack rowGap={2}>
								{data.slice(3, 7).map((tech) => (
									<TechItem key={tech} tech={tech} />
								))}
							</Stack>
						</Grid>
						<Grid item xs={4}>
							<Stack rowGap={2}>
								{data.slice(7).map((tech) => (
									<TechItem key={tech} tech={tech} />
								))}
							</Stack>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</SectionContainer>
	);
};

export default About;
