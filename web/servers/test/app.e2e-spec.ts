import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcryptjs';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Autosort Merang API (Role Access e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  let adminToken: string;
  let pegawaiToken: string;
  let adminId: string;
  let pegawaiId: string;
  let nodeId: string;
  let cameraId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);

    // Bersihkan DB supaya test fresh
    await prisma.cameraLog.deleteMany({});
    await prisma.camera.deleteMany({});
    await prisma.mushroomSorted.deleteMany({});
    await prisma.node.deleteMany({});
    await prisma.user.deleteMany({});

    // Buat ADMIN
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('123456', 10),
        role: 'ADMIN',
      },
    });
    adminId = admin.id;

    // Buat PEGAWAI
    const pegawai = await prisma.user.create({
      data: {
        name: 'Pegawai',
        email: 'pegawai@test.com',
        password: await bcrypt.hash('654321', 10),
        role: 'PEGAWAI',
      },
    });
    pegawaiId = pegawai.id;

    // Login ADMIN
    const loginAdmin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@test.com', password: '123456' });
    adminToken = loginAdmin.body.token;

    // Login PEGAWAI
    const loginPegawai = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'pegawai@test.com', password: '654321' });
    pegawaiToken = loginPegawai.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  // ========================= AUTH =========================
  it('PEGAWAI bisa login', async () => {
    expect(pegawaiToken).toBeDefined();
  });
  it('ADMIN bisa login', async () => {
    expect(adminToken).toBeDefined();
  });

  // ========================= USERS =========================
  it('ADMIN bisa melihat semua user', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body.some((u: any) => u.email === 'admin@test.com')).toBe(true);
  });

  it('PEGAWAI tidak boleh melihat semua user', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(403);
  });

  it('ADMIN bisa melihat detail user lain', async () => {
    const res = await request(app.getHttpServer())
      .get(`/users/${pegawaiId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body.email).toBe('pegawai@test.com');
  });

  it('PEGAWAI hanya boleh melihat dirinya sendiri', async () => {
    await request(app.getHttpServer())
      .get(`/users/${adminId}`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(403);

    const res = await request(app.getHttpServer())
      .get(`/users/${pegawaiId}`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(200);
    expect(res.body.id).toBe(pegawaiId);
  });

  it('PEGAWAI tidak boleh menghapus user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${adminId}`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(403);
  });

  // ========================= NODES =========================
  it('ADMIN bisa membuat node', async () => {
    const res = await request(app.getHttpServer())
      .post('/nodes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Node Test', serial: 'ESP32-999' })
      .expect(201);
    nodeId = res.body.id;
  });

  it('PEGAWAI bisa melihat daftar node', async () => {
    const res = await request(app.getHttpServer())
      .get('/nodes')
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PEGAWAI tidak boleh update status node', async () => {
    await request(app.getHttpServer())
      .patch(`/nodes/${nodeId}/status`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .send({ status: 'ONLINE' })
      .expect(403);
  });

  it('ADMIN bisa update status node', async () => {
    await request(app.getHttpServer())
      .patch(`/nodes/${nodeId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'ONLINE' })
      .expect(200);
  });

  // ========================= CAMERAS =========================
  it('ADMIN bisa membuat camera', async () => {
    const res = await request(app.getHttpServer())
      .post('/cameras')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ nodeId, name: 'Camera Test', url: 'http://ip-camera/test' })
      .expect(201);
    cameraId = res.body.id;
  });

  it('PEGAWAI bisa melihat camera by node', async () => {
    const res = await request(app.getHttpServer())
      .get(`/cameras/${nodeId}`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PEGAWAI tidak boleh update status camera', async () => {
    await request(app.getHttpServer())
      .patch(`/cameras/${cameraId}/status`)
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .send({ status: 'ACTIVE' })
      .expect(403);
  });

  it('ADMIN bisa update status camera', async () => {
    await request(app.getHttpServer())
      .patch(`/cameras/${cameraId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'ACTIVE' })
      .expect(200);
  });

  // ========================= MUSHROOMS =========================
  it('PEGAWAI bisa input sortir jamur', async () => {
    await request(app.getHttpServer())
      .post('/mushrooms')
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .send({ nodeId, createdBy: pegawaiId, grade: 'A', quantity: 10 })
      .expect(201);
  });

  it('PEGAWAI bisa melihat daftar jamur', async () => {
    const res = await request(app.getHttpServer())
      .get('/mushrooms')
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PEGAWAI tidak boleh akses summary', async () => {
    await request(app.getHttpServer())
      .get('/mushrooms/summary')
      .set('Authorization', `Bearer ${pegawaiToken}`)
      .expect(403);
  });

  it('ADMIN bisa akses summary', async () => {
    const res = await request(app.getHttpServer())
      .get('/mushrooms/summary')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
