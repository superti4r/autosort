import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: { name: string; email: string; password: string }) {
    const exist = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exist) throw new BadRequestException('Email already registered');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hash },
    });

    return { id: user.id, email: user.email };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
    );

    return { token, role: user.role };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Email not found');

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    await this.prisma.resetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    return { resetToken: token };
  }

  async resetPassword(dto: { token: string; newPassword: string }) {
    const payload = this.verifyToken(dto.token);

    const record = await this.prisma.resetToken.findUnique({
      where: { token: dto.token },
    });

    if (!record || record.used || record.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: payload.sub },
      data: { password: hash },
    });

    await this.prisma.resetToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    return { message: 'Password updated successfully' };
  }

  private verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
