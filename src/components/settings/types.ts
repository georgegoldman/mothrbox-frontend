export type NetworkType = 'testnet' | 'mainnet';
export type ThemeType = 'light' | 'dark' | 'auto';
export type AlgorithmType = 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'ECC';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: number;
  network: NetworkType;
}

export interface StorageQuota {
  usedBytes: number;
  totalBytes: number; 
  fileCount: number;
}

export interface NotificationPreferences {
  encryption: boolean;
  decryption: boolean;
  lowStorage: boolean;
  lowBalance: boolean;
  networkStatus: boolean;
  failedTransactions: boolean;
  updates: boolean;
}

export interface SettingsState {
  theme: ThemeType;
  accentColor: string; // e.g., 'purple', 'blue'
  defaultAlgorithm: AlgorithmType;
  autoLogoutMinutes: number;
  storage: StorageQuota;
  notifications: NotificationPreferences;
  isDevMode: boolean;
  rpcEndpoint: string | null;
}

// Props shared by section components
export interface SettingsSectionProps {
  id?: string; // for scrolling
  className?: string;
}
