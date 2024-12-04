import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { AddTranslationComponent } from './components/admin-crud/add-translation/add-translation.component';
import { EditableTableTranslationComponent  } from './components/admin-crud/editable-table-translations/editable-table-translations.component';

export const routes: Routes = [
    {
      path: 'register',component: RegisterComponent,
    },
    {
      path: 'login', component: LoginComponent,
    },
    {
      path: 'translator', component: TranslatorComponent,
      data: { role: 'user' },
    },
    {
      path: 'admin-dashboard',
      component: AdminComponent,
      canActivate: [authGuard],
      data: { role: 'admin' },
    },
    {
      path: 'add-translation',
      component: AddTranslationComponent,
      canActivate: [authGuard],
      data: { role: 'admin' },
    },
    {
      path: '',
      redirectTo: '/',
      pathMatch: 'full',
    },
  ];
