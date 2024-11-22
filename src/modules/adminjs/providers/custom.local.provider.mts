import { LocalProvider } from '@adminjs/upload';
import { UploadedFile } from 'adminjs';
import { promises } from 'fs';
import { dirname } from 'path';

export class CustomLocalProvider extends LocalProvider {
    public async upload(file: UploadedFile, key: string): Promise<any> {
        const filePath =
            process.platform === 'win32'
                ? this.path(key)
                : this.path(key).slice(1);
        await promises.mkdir(dirname(filePath), { recursive: true });
        await promises.copyFile(file.path, filePath);
        await promises.unlink(file.path);
    }
}
