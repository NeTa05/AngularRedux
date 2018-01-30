import { NgModule } from '@angular/core';

//imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AppBootstrapModule } from './modules/app-bootstrap.module';
import { NgReduxModule } from '@angular-redux/store';

//Components
import { AppComponent } from './app.component';
import { StoresComponent } from './components/stores/stores.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StoreHeaderComponent } from './components/store-header/store-header.component';

//Entry Components
import { StoreTableComponent } from './components/store-table/store-table.component';
import { StoreModalComponent } from './components/store-modal/store-modal.component';

//Redux
import { 
  NgRedux,
  DevToolsExtension 
} from '@angular-redux/store';
import { Reducers } from './stores/index.reducer';
import { AppState } from './stores/app.state';
import { ArticleHeaderComponent } from './components/article-header/article-header.component';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { ArticleTableComponent } from './components/article-table/article-table.component';

// Providers
import { Services } from './services/index.service';
import { Actions } from './actions/index.actions';
import { Constants } from './utils/constants';

//Routes
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
    StoreHeaderComponent,
    StoreTableComponent,
    StoreModalComponent,
    ArticleHeaderComponent,
    ArticleModalComponent,
    ArticleTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppBootstrapModule,
    NgReduxModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  entryComponents: [
    StoreModalComponent,
    ArticleModalComponent
  ],
  providers: [
    Actions, 
    Services,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(private ngRedux: NgRedux<AppState>, private devTool: DevToolsExtension) {
    let devTools = devTool.isEnabled() ? devTool.enhancer() : f => f;
    this.ngRedux.configureStore(Reducers,{} as AppState, [], [devTools]);
  }
}
