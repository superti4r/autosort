import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordAdmin = await bcrypt.hash('admin123', 10);
  const passwordPegawai = await bcrypt.hash('pegawai123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: passwordAdmin,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'pegawai@gmail.com' },
    update: {},
    create: {
      name: 'Pegawai',
      email: 'pegawai@gmail.com',
      password: passwordPegawai,
      role: 'PEGAWAI',
    },
  });
}

main()
  .then(() => {
    console.log('✅ Seeder complete — first seeds created');
  })
  .catch((e) => {
    console.error('❌ Seeder failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
