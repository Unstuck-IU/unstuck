// import { supabase } from '../Components/auth/supabaseDeets';
// import React, {
// 	createContext,
// 	useContext,
// 	useEffect,
// 	useMemo,
// 	useState
// } from 'react';



// const supabaseClient = supabase

// const SessionContext = createContext({
// 	isLoading,
// 	session,
// 	error,
// 	supabaseClient
// });


// export const SessionContextProvider = ({
// 	supabaseClient,
// 	initialSession = null,
// 	children
// }) => {
// 	const [session, setSession] = useState(initialSession);
// 	const [isLoading, setIsLoading] = useState(!initialSession);
// 	const [error, setError] = useState();

// 	useEffect(() => {
// 		let mounted = true;

// 		async function getSession() {
// 			const {
// 				data: { session },
// 				error
// 			} = await supabaseClient.auth.getSession();

// 			// only update the react state if the component is still mounted
// 			if (mounted) {
// 				if (error) {
// 					setError(error);
// 					setIsLoading(false);
// 					return;
// 				}

// 				setSession(session);
// 				setIsLoading(false);
// 			}
// 		}

// 		getSession();

// 		return () => {
// 			mounted = false;
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const {
// 			data: { subscription }
// 		} = supabaseClient.auth.onAuthStateChange((event, session) => {
// 			if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
// 				setSession(session);
// 			}

// 			if (event === 'SIGNED_OUT') {
// 				setSession(null);
// 			}
// 		});

// 		return () => {
// 			subscription.unsubscribe();
// 		};
// 	}, []);

// 	const value = useMemo(() => {
// 		if (isLoading) {
// 			return {
// 				isLoading,
// 				session,
// 				error,
// 				supabaseClient
// 			};
// 		}

// 		if (error) {
// 			return {
// 				isLoading: false,
// 				session: null,
// 				error,
// 				supabaseClient
// 			};
// 		}

// 		return {
// 			isLoading: false,
// 			session,
// 			error: null,
// 			supabaseClient
// 		};
// 	}, [isLoading, session, error]);

// 	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
// };

// export const useSessionContext = () => {
// 	const context = useContext(SessionContext);
// 	if (context === undefined) {
// 		throw new Error(`useSessionContext must be used within a SessionContextProvider.`);
// 	}

// 	return context;
// };

// export function useSupabaseClient() {
// 	const context = useContext(SessionContext);
// 	if (context === undefined) {
// 		throw new Error(`useSupabaseClient must be used within a SessionContextProvider.`);
// 	}

// 	return context.supabaseClient;
// }

// export const useSession = () => {
// 	const context = useContext(SessionContext);
// 	if (context === undefined) {
// 		throw new Error(`useSession must be used within a SessionContextProvider.`);
// 	}

// 	return context.session;
// };

// export const useUser = () => {
// 	const context = useContext(SessionContext);
// 	if (context === undefined) {
// 		throw new Error(`useUser must be used within a SessionContextProvider.`);
// 	}

// 	return context.session?.user ?? null;
// };