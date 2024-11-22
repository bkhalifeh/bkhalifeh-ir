import { ComponentLoader } from 'adminjs';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
  bundleComponent = (loader: ComponentLoader, componentName: string) => {
    const fullPath = path.join(
      process.cwd(),
      `/components/adminjs-relation/${componentName}`,
    );
    return loader.add(componentName, fullPath);
  };
export default bundleComponent;
