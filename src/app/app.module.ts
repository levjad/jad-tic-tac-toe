import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SvgXComponent} from "./components/x.component";
import {SvgOComponent} from "./components/o.component";

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SvgXComponent,
    SvgOComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
