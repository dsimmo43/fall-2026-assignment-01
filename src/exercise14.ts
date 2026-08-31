import fs from 'fs/promises';

export type PostItem = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPostBatch(postIds: number[]): Promise<PostItem[]> {
  const requests = postIds.map((id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`));

  const responses = await Promise.all(requests);

  const posts: PostItem[] = await Promise.all(responses.map((response) => response.json()));
  return posts;
}
