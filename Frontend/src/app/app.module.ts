import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { AppBootstrapModule } from './modules/app-bootstrap.module';
import { StoresComponent } from './components/stores/stores.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

//providers
import { appStoreProviders } from './redux/app.store';
import { AUTH_PROVIDERS } from './services/store.service';

const routes: Routes = [
  { path: '', redirectTo: 'store', pathMatch: 'full' },
  { path: 'store', component: StoresComponent },
  { path: 'article', component: ArticlesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StoresComponent,
    ArticlesComponent,
    NavigationComponent,
    HeaderComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppBootstrapModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [appStoreProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
