import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]  },
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]  },
  { path: 'timetable', component: TimetableComponent,canActivate:[AuthGuard]  },
  {path: 'notification-dialog', component: NotificationDialogComponent,canActivate:[AuthGuard]},
  {path: 'category', component: CategoryComponent,canActivate:[AuthGuard]},
  {path:'home/kanban', component:HomeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
