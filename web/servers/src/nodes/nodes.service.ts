import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NodesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.node.findMany({ include: { cameras: true, mushrooms: true } });
  }

  create(dto: { name: string; serial: string; location?: string }) {
    return this.prisma.node.create({ data: dto });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.node.update({ where: { id }, data: { status: status as any } });
  }

  remove(id: string) {
    return this.prisma.node.delete({ where: { id } });
  }
}
