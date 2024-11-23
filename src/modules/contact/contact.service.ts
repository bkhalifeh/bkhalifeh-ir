import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dtos/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateContactDto) {
    this.prismaService.contact
      .create({
        data: dto,
      })
      .then(() => {});
  }
}
