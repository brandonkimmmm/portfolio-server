import { Container } from '@mantine/core';
import { ReactNode } from 'react';

export default function MainContainer({ children }: { children: ReactNode }) {
	return <Container>{children}</Container>;
}