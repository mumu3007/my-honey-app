interface User {
  id: number;
  name?: string | null;
  email: string;
  password?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
//   accounts: Account[];
//   honeypots: Honeypots[];
  createdAt: Date;
  updatedAt: Date;
}