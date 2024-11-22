import { ComponentLoader } from 'adminjs';
import { PrismaService } from '../../prisma/prisma.service.js';
import { UtilService } from '../../util/util.service.js';

export type TResourceInput = {
  componentLoader: ComponentLoader;
  prismaService: PrismaService;
  utilService: UtilService;
};

export type TJsonFeatureInput = {
  properties: string[];
};

export type TSlugFeatureInput = {
  input: string;
  output: string;
};
