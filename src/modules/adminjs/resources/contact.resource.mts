import { getModelByName } from '@adminjs/prisma';
import { ResourceWithOptions } from 'adminjs';
import { TResourceInput } from '../types/adminjs.type.mjs';

export const ContactResource = async (
  args: TResourceInput,
): Promise<ResourceWithOptions> => {
  return {
    resource: {
      model: getModelByName('Contact'),
      client: args.prismaService,
    },
    options: {
      navigation: {
        icon: 'PhoneOutgoing',
      },
    },
  };
};

export default ContactResource;
