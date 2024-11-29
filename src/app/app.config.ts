import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        //  useClass: PathLocationStrategy,
        // Use 'manual' instead of 'enabled'
      })
    ),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
    { provide: PathLocationStrategy, useClass: PathLocationStrategy },
  ],
};
