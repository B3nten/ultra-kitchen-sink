// twind
import { tw } from 'twind'

//emotion
import { default as emotion } from '@emotion/styled'

//stitches
import { styled as stitches } from '../stitches.config.ts'
import { Suspense } from 'react'
import QueryComponent from './QueryComponent.tsx'
import { Helmet } from 'react-helmet-async'

//react-router
import { Route, Routes, Link } from 'react-router-dom'

const EmotionDiv = emotion.div`
  color: blue;
`

const StitchesDiv = stitches('div', {
	color: 'purple',
})

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='shortcut icon' href='/favicon.ico' />
				<link rel='stylesheet' href='/style.css' />
				<Helmet prioritizeSeoTags>
					<title>Ultra Kitchen Sink</title>
				</Helmet>
			</head>
			<body>
				<div className={tw`text-red-500 font-mono`}>Hello from Twind</div>
				<EmotionDiv>Hello from Emotion</EmotionDiv>
				<StitchesDiv>Hello from Stitches</StitchesDiv>
				<Suspense>
					<QueryComponent />
				</Suspense>
				<Suspense>
					<Routes>
						<Route
							path='/'
							element={
								<div>
									Home from react-router{' '}
									<Link to='/another-route' className={tw`underline`}>
										go to another route
									</Link>
								</div>
							}
						/>
						<Route
							path='/another-route'
							element={
								<div>
									Another route from react-router{' '}
									<Link to='/' className={tw`underline`}>
										Go home
									</Link>
								</div>
							}
						/>
					</Routes>
				</Suspense>
			</body>
		</html>
	)
}
