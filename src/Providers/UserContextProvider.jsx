// import React, { useEffect, useState, createContext, useContext } from 'react'



// const UserContext = createContext({ user })


// export const UserContextProvider = (props) => {
//   const { supabaseClient } = props
//   const [session, setSession] = useState(
//     supabaseClient.auth.session()
//   )
//   const [user, setUser] = useState(session?.user ?? null)

//   useEffect(() => {
//     const { data: authListener } = supabaseClient.auth.onAuthStateChange(
//       async (event, session) => {
//         setSession(session)
//         setUser(session?.user ?? null)
//       }
//     )

//     return () => {
//       authListener?.unsubscribe()
//     }
  
//   }, [])

//   const value = {
//     session,
//     user,
//   }
//   return <UserContext.Provider value={value} {...props} />
// }

// export const useUser = () => {
//   const context = useContext(UserContext)
//   if (context === undefined) {
//     throw new Error(`useUser must be used within a UserContextProvider.`)
//   }
//   return context
// }