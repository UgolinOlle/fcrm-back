import { genSalt, hash } from 'bcrypt';

export async function hashData(data: string): Promise<string> {
  const SALT = await genSalt();
  return await hash(data, SALT);
}
