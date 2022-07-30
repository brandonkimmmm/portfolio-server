import { Stack, Typography, Grid, Box, List, ListItem } from '@mui/material';
import { FC } from 'react';
import TechIcon from '../../components/TechIcon';

type Props = {
	title: string;
	role: string;
	dates: string;
	tech_stack: string[];
	description: string[];
	reverse?: boolean;
};

const ExpItem: FC<Props> = ({
	title,
	role,
	dates,
	tech_stack,
	description
}: Props) => {
	return (
		<Grid container columnSpacing={4}>
			<Grid item xs={5}>
				<Stack
					sx={{
						height: 250,
						justifyContent: 'space-between',
						backgroundColor: 'primary.main',
						p: 4,
						borderRadius: 4,
						boxShadow: 10
					}}
				>
					<Typography variant='h4' fontWeight='bold'>
						{title}
					</Typography>
					<Stack>
						<Typography>{role}</Typography>
						<Typography variant='body2'>{dates}</Typography>
					</Stack>
					<Stack
						direction='row'
						sx={{
							overflow: 'auto'
						}}
						columnGap={1}
					>
						{tech_stack.map((tech) => (
							<Box key={tech}>
								<TechIcon tech={tech} size={50} />
							</Box>
						))}
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={7}>
				<List disablePadding>
					{description.map((item) => (
						<ListItem key={item} disableGutters>
							<Typography variant='body2'>{item}</Typography>
						</ListItem>
					))}
				</List>
			</Grid>
		</Grid>
	);
};

export default ExpItem;
