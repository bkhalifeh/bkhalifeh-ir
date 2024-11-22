import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

@Injectable()
export class UtilService {
  b64decode(encodedText: string) {
    return Buffer.from(encodedText, 'base64');
  }
  public randomFilename(filename: string) {
    return randomUUID() + extname(filename);
  }
}
