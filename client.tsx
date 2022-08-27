//base
import { hydrateRoot } from 'react-dom/client'
import App from './src/app.tsx'

//twind
import { TwindProvider } from './TwindProvider.tsx'
import './twind.ts'

//stitches
import { StitchesProvider } from './StitchesProvider.tsx'

// react-query
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient.ts'
declare const __REACT_QUERY_DEHYDRATED_STATE: unknown

//helmet
import { HelmetProvider } from 'react-helmet-async'

//react-router
import { BrowserRouter } from 'react-router-dom'

hydrateRoot(
	document,
	<HelmetProvider>
		<QueryClientProvider client={queryClient}>
			<Hydrate state={__REACT_QUERY_DEHYDRATED_STATE}>
				<StitchesProvider>
					<TwindProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</TwindProvider>
				</StitchesProvider>
			</Hydrate>
		</QueryClientProvider>
	</HelmetProvider>
)
