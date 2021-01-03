import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent} from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DoctorfeeComponent } from './doctorfee/doctorfee.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CallsComponent } from './calls/calls.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'calls',
    component: CallsComponent
  },
  {
    path: 'bookappointment',
    component:BookappointmentComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'Patientprofile',
    component: PatientprofileComponent
  },
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'doctorfee',
    component: DoctorfeeComponent
  },
  {
    path: 'createprofile',
    component: CreateprofileComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
