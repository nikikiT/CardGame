import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { promises as fsPromises } from 'fs';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



