export type ActionType = 'upload' | 'download' | 'decrypt' | 'delete' | 'transfer' | 'keygen';
export type AlgorithmType = 'AES-256-GCM' | 'ChaCha20-Poly1305' | 'ECC' | null;
export type StatusType = 'success' | 'failed' | 'pending';
export type NetworkType = 'testnet' | 'mainnet';

export interface HistoryRecord {
  id: string;
  action: ActionType;
  fileName: string;
  fileType: string;
  algorithm: AlgorithmType;
  size: number; // bytes
  cost: number; // SUI
  timestamp: string; // ISO 8601
  status: StatusType;
  transactionHash?: string;
  nftKeyId?: string;
  network: NetworkType;
  errorMessage?: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface FilterState {
  search: string;
  actions: string[]; // empty means all
  algorithms: string[]; // empty means all
  sizeRange: string; // 'all' | '<1MB' | '1MB-10MB' | '10MB-100MB' | '100MB-1GB' | '>1GB'
  costRange: string; // 'all' | '<0.01' | '0.01-0.1' | '0.1-1' | '>1'
  dateRange: string; // 'all' | 'today' | 'week' | 'month' | '3months' | 'year' | 'custom'
  customDateRange?: DateRange;
  status: string[]; // empty means all
}

export interface SortConfig {
  column: keyof HistoryRecord;
  direction: 'asc' | 'desc';
}
