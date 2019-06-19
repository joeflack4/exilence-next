import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../shared/shared.module';
import { NetWorthBarComponent } from './components/net-worth-bar/net-worth-bar.component';
import { NetWorthGraphComponent } from './components/net-worth-graph/net-worth-graph.component';
import { NetWorthItemTableComponent } from './components/net-worth-item-table/net-worth-item-table.component';
import { NetWorthToolbarComponent } from './components/net-worth-toolbar/net-worth-toolbar.component';
import { NetWorthPageComponent } from './containers/net-worth-page/net-worth-page.component';
import { NetWorthRoutingModule } from './net-worth-routing.module';
import { SnapshotService } from './providers/snapshot.service';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationEffects } from '../../store/application/application.effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './../../store/reducers';
@NgModule({
  declarations: [NetWorthPageComponent, NetWorthBarComponent, NetWorthToolbarComponent, NetWorthGraphComponent, NetWorthItemTableComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    NgxChartsModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NetWorthRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ApplicationEffects
    ])
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    SnapshotService
  ]
})
export class NetWorthModule { }
