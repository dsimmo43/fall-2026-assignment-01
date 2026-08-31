import fs from 'fs/promises';

export type CommentSummary = {
  postId: number;
  totalComments: number;
  commenterEmail: string;
};

export async function processCommentsPipeline(
  targetPostId: number,
  outputPath: string,
): Promise<number> {
  // 1. Fetch the collection of comments belonging to a post from: `https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`);
  // 2. Parse the payload and map it into an array of your exported `CommentSummary` structures.
  const comments = await response.json();
  const summaries: CommentSummary[] = comments.map((comment: { postId: number; id: number; email: string }) => ({
    postId: comment.postId,
    id: comment.id,
    commenterEmail: comment.email.trim(),
  }));
  // 3. Filter out any records where the email domain ends with `.org`.
  const filtered = summaries.filter((comment) => !comment.commenterEmail.endsWith('.org'));
  // 4. Serialize the surviving filtered results to JSON format and write the resulting string asynchronously to the specified `outputPath`.
  await fs.writeFile(outputPath, JSON.stringify(filtered));
  // 5. Return the final `number` count of processed records that were successfully saved to disk.
  return filtered.length;
}
