import {Routes} from '@angular/router';
import {ProfileGallery} from "./profile-gallery/profile-gallery";
import {SetupDate} from './setup-date/setup-date';

export const routes: Routes = [
  {path: '', component: ProfileGallery},
  {path: 'setup-date/:name', loadComponent: () => import('./setup-date/setup-date').then(() => SetupDate)}
];
