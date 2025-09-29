import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class MushroomsService {
  constructor(private prisma: PrismaService) {}

  create(dto: { nodeId?: string; createdBy?: string; grade: string; quantity: number }) {
    return this.prisma.mushroomSorted.create({ data: dto as any });
  }

  findAll(today: boolean) {
    if (today) {
      return this.prisma.mushroomSorted.findMany({
        where: { createdAt: { gte: startOfDay(new Date()), lte: endOfDay(new Date()) } },
      });
    }
    return this.prisma.mushroomSorted.findMany();
  }

  async summary() {
    const all = await this.prisma.mushroomSorted.groupBy({
      by: ['grade'],
      _sum: { quantity: true },
    });
    return all;
  }
}
