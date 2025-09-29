import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CamerasService {
  constructor(private prisma: PrismaService) {}

  findByNode(nodeId: string) {
    return this.prisma.camera.findMany({ where: { nodeId }, include: { logs: true } });
  }

  create(dto: { nodeId: string; name: string; url: string }) {
    return this.prisma.camera.create({ data: dto });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.camera.update({ where: { id }, data: { status: status as any } });
  }

  remove(id: string) {
    return this.prisma.camera.delete({ where: { id } });
  }
}
