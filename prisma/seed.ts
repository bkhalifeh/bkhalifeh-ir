import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const EMAIL = 'bkhalifeh@protonmail.com';
const PASSWORD = '1234567890';

const prisma = new PrismaClient();
async function main() {
  prisma.user
    .create({
      data: {
        email: EMAIL,
        password: await argon2.hash(PASSWORD),
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
