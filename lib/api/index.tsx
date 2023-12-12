
export async function getUsers(): Promise<User[]> {
  const data = await (await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users`)).json() as { users: User[] };
  const users = Promise.all(data.users.map(async u => getUserDetails(u)))
  return users;
}

export async function blockUser(user: User): Promise<User> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users/${user.id}/`, { method: 'PUT', body: JSON.stringify({ name: user.name, email: user.email, blocked: true, updatedAt: Date.now() }) });
  return (await result.json() as { user: User }).user;
}

export async function createUser(user: Partial<User>): Promise<User> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users/create`, { method: 'POST', body: JSON.stringify(user) });
  return (await result.json() as { user: User }).user
}

export async function getUserById(id: string): Promise<User> {
  const result = await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users/${id}/`);
  return await getUserDetails((await result.json() as { user: User }).user)
}

export async function getUserDetails(u: User): Promise<User> {
  const { albums } = await (await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users/${u.id}/albums`)).json() as { albums: Album[] };
  const { posts } = await (await fetch(`${process.env.NEXT_PUBLIC_SENSEDIA_API_URL}/users/${u.id}/posts`)).json() as { posts: Post[] };

  return { posts, albums, ...u }
}