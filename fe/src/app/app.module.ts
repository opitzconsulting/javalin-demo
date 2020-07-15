import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TechnologyComponent } from './technology/technology.component';
import { TechnologyListComponent } from './technology/technology-list/technology-list.component';
import { TechnologyItemComponent } from './technology/technology-list/technology-item/technology-item.component';
import { TechnologyDetailComponent } from './technology/technology-detail/technology-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { TechnologyStartComponent } from './technology/technology-start.component';
import { TechnologyEditComponent } from './technology/technology-edit/technology-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TechnologyService} from './technology/technology.service';
import { SearchPipePipe } from './technology/technology-list/search-pipe.pipe';
import { TruncatePipe } from './truncate.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TechnologyComponent,
    TechnologyListComponent,
    TechnologyItemComponent,
    TechnologyDetailComponent,
    TechnologyStartComponent,
    TechnologyEditComponent,
    SearchPipePipe,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [TechnologyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
