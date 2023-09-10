import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { INTERCEPTORS } from './interceptors';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '@layouts/components/header/header.component';
import { MainLayoutComponent } from '@layouts/components/main-layout/main-layout.component';
import { FooterComponent } from '@layouts/components/footer/footer.component';
import { WrapperComponent } from '@layouts/components/wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    WrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
