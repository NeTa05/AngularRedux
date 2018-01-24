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

//Redux
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { Reducers } from './stores/index.reducer';
import { AppState } from './stores/app.state';
import { Actions } from './actions/index.actions';

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
  providers: [Actions],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(
    private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension
  ) {
    let devTools = devTool.isEnabled() ? devTool.enhancer() : f => f;
    this.ngRedux.configureStore(Reducers,{} as AppState, [], [devTools]
    );
  }
}
