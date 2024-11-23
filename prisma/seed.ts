import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();
async function main() {
  prisma.user
    .create({
      data: {
        email: 'bkhalifeh@protonmail.com',
        password: await argon2.hash('Behz@DkH#8049'),
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
