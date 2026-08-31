import fs from 'fs/promises';

export type RemoteUser = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUserEmails(): Promise<string[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users: RemoteUser[] = await response.json();

  return users.map((user) => user.email);
}
