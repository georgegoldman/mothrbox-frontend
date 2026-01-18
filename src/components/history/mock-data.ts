import type { HistoryRecord, ActionType, AlgorithmType, StatusType } from "./types";

const ACTIONS: ActionType[] = ['upload', 'download', 'decrypt', 'delete', 'transfer', 'keygen'];
const ALGORITHMS: AlgorithmType[] = ['AES-256-GCM', 'ChaCha20-Poly1305', 'ECC'];
const STATUSES: StatusType[] = ['success', 'success', 'success', 'success', 'failed', 'pending']; // Weighted towards success
const FILE_TYPES = ['pdf', 'png', 'jpg', 'docx', 'xlsx', 'zip', 'mov'];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateMockData(count: number = 120): HistoryRecord[] {
  const data: HistoryRecord[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  for (let i = 0; i < count; i++) {
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]!;
    const isEncryptionRelated = ['upload', 'decrypt', 'keygen'].includes(action);
    const algorithm = isEncryptionRelated ? ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)]! : null;
    const fileType = FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)]!;
    const fileName = `Project_${randomString(5)}_${Math.floor(Math.random() * 1000)}.${fileType}`;
    
    // Size logic: logarithmic distribution for realism
    const size = Math.floor(Math.exp(Math.random() * 10 + 10)); // ~22KB to ~485MB range typically

    // Cost logic: tied roughly to size but with noise
    const cost = action === 'upload' ? (size / 1024 / 1024) * 0.005 + Math.random() * 0.001 : 0.002;

    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)]!;
    const date = randomDate(threeMonthsAgo, now);

    data.push({
      id: `act_${randomString(10)}`,
      action,
      fileName,
      fileType,
      algorithm,
      size,
      cost,
      timestamp: date.toISOString(),
      status,
      transactionHash: status === 'success' ? `0x${randomString(40)}` : undefined,
      nftKeyId: action === 'keygen' || action === 'upload' ? `nft_${randomString(8)}` : undefined,
      network: 'mainnet',
      errorMessage: status === 'failed' ? 'Network timeout or insufficient funds' : undefined,
    });
  }

  return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
