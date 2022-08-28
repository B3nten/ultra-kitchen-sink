//base
import { serve } from 'https://deno.land/std@0.153.0/http/server.ts'
import { createServer } from 'ultra/server.ts'
import App from './src/app.tsx'

//stitches
import { StitchesProvider } from './StitchesProvider.tsx'

//twind
import { TwindProvider } from './TwindProvider.tsx'
import './twind.ts'

//react-query
import { QueryClientProvider } from '@tanstack/react-query'
import { useDehydrateReactQuery } from './useDehydrateReactQuery.tsx'
import { queryClient } from './queryClient.ts'

//helmet
import { HelmetProvider } from 'react-helmet-async'
import useFlushEffects from 'ultra/hooks/use-flush-effects.js'
// deno-lint-ignore no-explicit-any
const helmetContext: Record<string, any> = {}

//react-router
import { StaticRouter } from 'react-router-dom/server'

//wouter
import { Router } from 'wouter'
import staticLocationHook from 'wouter/static-location'
import { SearchParamsProvider } from "./SearchParams.tsx";

const server = await createServer({
	importMapPath: import.meta.resolve('./importMap.json'),
	browserEntrypoint: import.meta.resolve('./client.tsx'),
})

function ServerApp({ context }: { context: any }) {
	useDehydrateReactQuery(queryClient)
	useFlushEffects(() => {
		const { helmet } = helmetContext
		return (
			<>
				{helmet.title.toComponent()}
				{helmet.priority.toComponent()}
				{helmet.meta.toComponent()}
				{helmet.link.toComponent()}
				{helmet.script.toComponent()}
			</>
		)
	})
	const requestUrl = new URL(context.req.url)
	return (
		<HelmetProvider context={helmetContext}>
			<QueryClientProvider client={queryClient}>
				<StitchesProvider>
					<TwindProvider>
						<StaticRouter location={requestUrl.pathname}>
							<Router hook={staticLocationHook(requestUrl.pathname)}>
								<SearchParamsProvider value={requestUrl.searchParams}>
									<App />
								</SearchParamsProvider>
							</Router>
						</StaticRouter>
					</TwindProvider>
				</StitchesProvider>
			</QueryClientProvider>
		</HelmetProvider>
	)
}

server.get('*', async context => {
	queryClient.clear()

	const result = await server.render(<ServerApp context={context} />)

	return context.body(result, 200, {
		'content-type': 'text/html',
	})
})

serve(server.fetch)
