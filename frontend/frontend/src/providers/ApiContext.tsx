import React, { createContext, useContext } from 'react'

const ApiContext = createContext<string | undefined>(undefined)

export const ApiProvider: React.FC<{ apiUrl: string, children: any }> = ({ apiUrl, children }) => {
  return (
    <ApiContext.Provider value={apiUrl}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
