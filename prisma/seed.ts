import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const EMAIL = 'bkhalifeh@protonmail.com';
const PASSWORD = 'BeHZaD@bu@48';

const prisma = new PrismaClient();
async function main() {
  const password = await argon2.hash(PASSWORD);
  prisma.user
    .upsert({
      where: { email: EMAIL },
      create: {
        email: EMAIL,
        password,
      },
      update: {
        password,
      },
    })
    .then(() => {});
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
