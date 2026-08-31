import fs from 'fs/promises';

export async function logStatusToFile(
  filePath: string,
  statusMessage: string,
): Promise<void> {
  const timeStamp = new Date().toISOString();
  const message = `${statusMessage} - ${timeStamp}\n`;

  await fs.appendFile(filePath, message);
}
