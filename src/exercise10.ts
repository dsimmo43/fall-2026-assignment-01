export type UserAccount = {
  id: string;
  createdAt: Date;
  email: string;
  passwordHash: string;
  profile: {bio: string; avatarUrl: string;};
};

export class UserRegistry {
  private users: UserAccount[] = [];
  
  public registerUser(
    data: Omit<UserAccount, 'id' | 'createdAt'>,
  ): UserAccount {
    const user: UserAccount = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    };
    this.users.push(user);
    return user;
  }

  public getUserView(
    id: string,
  ): Readonly<Pick<UserAccount, 'id' | 'email' | 'profile'>> | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) return undefined;

    return Object.freeze({
      id: user.id,
      email: user.email,
      profile: {
        bio: user.profile.bio,
        avatarUrl: user.profile.avatarUrl,
      },
    });
  }
}
