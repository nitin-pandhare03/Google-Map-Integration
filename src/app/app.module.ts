import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmOverlays } from 'agm-overlays';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AgmSnazzyInfoWindowModule,
    AgmOverlays,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzOYxE3jjvvwOPzX20HGwA8-UiCdmzr9A',
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
