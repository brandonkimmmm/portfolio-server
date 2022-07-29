import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../src/createEmotionCache';
import { SnackbarProvider } from 'notistack';
import '@fontsource/oxygen/300.css';
import '@fontsource/oxygen/400.css';
import '@fontsource/oxygen/700.css';
import './global.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps
	} = props;
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Brandon Kim | Full Stack Web Developer</title>
				<meta
					name='viewport'
					content='initial-scale=1, width=device-width'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3} autoHideDuration={2000}>
					<CssBaseline />
					<Component {...pageProps} />
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
