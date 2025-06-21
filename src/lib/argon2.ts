import { hash, verify, type Options } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 2 ** 16,
  timeCost: 3,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) => {
  return await hash(password, opts);
};

export const verifyPassword = async ({
  password,
  hash: hashedPassword,
}: {
  password: string;
  hash: string;
}) => {
  return await verify(hashedPassword, password, opts);
};
