import {
	Box,
	Flex,
	Group,
	NavLink,
	Navbar,
	Stack,
	Text,
	rem
} from '@mantine/core';
import { capitalize } from 'lodash';
import Icon from '../components/Icon';
import MainLogo from '../components/MainLogo';
import { NAV, TECH } from '../constants';
import useCurrentView from '../hooks/useCurrentView';

const NAV_LINK_ITEMS = [NAV.HOME, NAV.PROJECTS, NAV.RESUME];

export default function SideBar() {
	const { currentView, changeView } = useCurrentView();

	return (
		<Navbar width={{ base: 300 }} p='xs'>
			<Navbar.Section mt='xs'>
				<Box
					sx={(theme) => ({
						paddingLeft: theme.spacing.xs,
						paddingRight: theme.spacing.xs,
						paddingBottom: theme.spacing.lg,
						borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`
					})}
				>
					<Group position='apart'>
						<Flex align='center' gap={10}>
							<MainLogo width={rem(50)} />
							<Text>Brandon Kim</Text>
						</Flex>
					</Group>
				</Box>
			</Navbar.Section>
			<Navbar.Section grow mt='md'>
				{NAV_LINK_ITEMS.map((type) => (
					<NavLink
						key={type}
						label={capitalize(type)}
						icon={<Icon type={type} size='1.5rem' />}
						active={currentView === type}
						onClick={() => changeView(type)}
					/>
				))}
			</Navbar.Section>
			<Navbar.Section>
				<Stack
					sx={(theme) => ({
						paddingTop: theme.spacing.sm,
						borderTop: `${rem(1)} solid ${theme.colors.dark[4]}`,
						gap: rem(10),
						alignItems: 'center'
					})}
				>
					<Text>Brandon Kim ©2023</Text>
					<Group sx={{ gap: rem(4) }}>
						<Text>Built with</Text>
						<Group sx={{ gap: rem(3) }}>
							<Icon type={TECH.NEXT} size='1.5rem' />
							<Icon type={TECH.TS} size='1.5rem' />
							<Icon type={TECH.REACT} size='1.5rem' />
							<Icon type={TECH.MANTINE} size='1.5rem' />
						</Group>
					</Group>
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
}
