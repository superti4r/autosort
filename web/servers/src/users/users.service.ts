import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(dto: { name: string; email: string; password: string; role?: string }) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: { ...dto, password: hash, role: dto.role as any },
    });
  }

  update(id: string, dto: any) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
