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
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../shared/shared.module';
import { NetWorthEffects } from '../../store/net-worth/net-worth.effects';
import { reducer } from '../../store/net-worth/net-worth.reducer';
import { NetWorthBarComponent } from './components/net-worth-bar/net-worth-bar.component';
import { NetWorthGraphComponent } from './components/net-worth-graph/net-worth-graph.component';
import { NetWorthItemTableComponent } from './components/net-worth-item-table/net-worth-item-table.component';
import { NetWorthPageComponent } from './containers/net-worth-page/net-worth-page.component';
import { NetWorthRoutingModule } from './net-worth-routing.module';
import { SnapshotService } from './providers/snapshot.service';
import { ItemPricingService } from './providers/item-pricing.service';
import { PoeNinjaService } from './providers/poe-ninja.service';
import { PoeWatchService } from './providers/poe-watch.service';

@NgModule({
  declarations: [NetWorthPageComponent, NetWorthBarComponent, NetWorthGraphComponent, NetWorthItemTableComponent],
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
    StoreModule.forFeature('netWorthState', reducer),
    EffectsModule.forFeature([
      NetWorthEffects
    ])
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    SnapshotService, ItemPricingService, PoeNinjaService, PoeWatchService
  ]
})
export class NetWorthModule { }
