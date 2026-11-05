// AI Provider abstraction: swap Decart for another vendor by implementing this interface.
export interface ClientToken { apiKey: string; expiresAt: string }
export interface AIProvider { name: string; createClientToken(): Promise<ClientToken> }
