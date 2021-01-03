import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DoctorfeeComponent } from './doctorfee/doctorfee.component';
import { ActivecallComponent } from './activecall/activecall.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DoctorlistComponent } from './doctorlist/doctorlist.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilebarComponent } from './profilebar/profilebar.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TodayappointmentComponent } from './todayappointment/todayappointment.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CallsComponent } from './calls/calls.component';
import { AllappointmentComponent } from './allappointment/allappointment.component';
import { CallsService } from './calls/calls.service';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    OtpComponent,
    CreateprofileComponent,
    DoctorfeeComponent,
    ActivecallComponent,
    WelcomeComponent,
    DoctorlistComponent,
    PatientprofileComponent,
    LogoutComponent,
    ProfilebarComponent,
    MyprofileComponent,
    ForgotpasswordComponent,
    TodayappointmentComponent,
    BookappointmentComponent,
    CallsComponent,
    AllappointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule


  ],
  providers: [CallsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
