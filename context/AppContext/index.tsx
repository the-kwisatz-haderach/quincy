import { createContext, useContext } from 'react'
import { IAppContext } from './types'

export const AppContext = createContext<IAppContext>({
  menu: [],
  socialChannels: [],
})

export const useAppContext = () => useContext(AppContext)

export default AppContext.Provider
