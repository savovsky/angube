import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './core/app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule} from '@ngrx/router-store';
import { appReducer } from './shared/store/app.reducer';
import { appEffects } from './shared/store/app.effects';
import { environment } from './../environments/environment';
import { CustomSerializer } from './shared/store/custom-route-serializer';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    UserModule,
    NavbarModule,
    AdminModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
    // https://ngrx.io/guide/router-store, https://www.youtube.com/watch?v=mgH4FGs9M4g, https://ngrx.io/guide/router-store/configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
