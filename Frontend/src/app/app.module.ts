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

import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer } from './store/main.reducer';
import { IAppState } from './store/app.state';
import { UsersActions } from './actions/users.actions';

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
    NgReduxModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [UsersActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
