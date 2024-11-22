import { ComponentLoader } from 'adminjs';
import { PrismaService } from '../../prisma/prisma.service.js';

export type TResourceInput = {
  componentLoader: ComponentLoader;
  prismaService: PrismaService;
};

export type TJsonFeatureInput = {
  properties: string[];
};

export type TSlugFeatureInput = {
  input: string;
  output: string;
};
