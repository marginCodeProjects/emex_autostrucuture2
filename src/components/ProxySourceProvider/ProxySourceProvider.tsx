import { createContext, useState, useContext, ReactNode } from 'react'

type ProxySource = 'MANGO' | 'BRIGHTDATA'

interface ProxySourceContextType {
    proxySource: ProxySource
    toggleProxySource: () => void
}

const ProxySourceContext = createContext<ProxySourceContextType | undefined>(undefined)

export const useProxySource = () => {
    const context = useContext(ProxySourceContext)
    if (!context) {
        throw new Error('useProxySource must be used within a ProxySourceProvider')
    }
    return context
}

interface ProxySourceProviderProps {
    children: ReactNode
}

export const ProxySourceProvider: React.FC<ProxySourceProviderProps> = ({ children }) => {
    const [proxySource, setProxySource] = useState<ProxySource>('MANGO')

    const toggleProxySource = () => {
        setProxySource((prevSource) => (prevSource === 'MANGO' ? 'BRIGHTDATA' : 'MANGO'))
    }

    return (
        <ProxySourceContext.Provider value={{ proxySource, toggleProxySource }}>
            {children}
        </ProxySourceContext.Provider>
    )
}