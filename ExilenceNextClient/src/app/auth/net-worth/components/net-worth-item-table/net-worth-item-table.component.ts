import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemHelper } from './../../../../shared/helpers/item.helper';
import { Observable } from 'rxjs';
import { Tab, CompactTab } from '../../../../shared/interfaces/stash.interface';
import { TabSelection } from '../../../../shared/interfaces/tab-selection.interface';
import { PricedItem } from '../../../../shared/interfaces/priced-item.interface';
import { TableItem } from '../../../../shared/interfaces/table-item.interface';
import { TableHelper } from '../../../../shared/helpers/table.helper';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { ExportHelper } from '../../../../shared/helpers/export.helper';

@Component({
  selector: 'app-net-worth-item-table',
  templateUrl: './net-worth-item-table.component.html',
  styleUrls: ['./net-worth-item-table.component.scss']
})
export class NetWorthItemTableComponent implements OnInit {
  @Input() tableData: TableItem[];

  @ViewChild(MatSort, undefined) sort: MatSort;
  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;

  private filterValue = '';
  public stashtabs$: Observable<Tab[]>;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public displayedColumns: string[] = ['icon', 'name', 'tab', 'links', 'quality', 'level', 'corrupted',
    'stackSize', 'calculated', 'total'];
  dataSource: any;

  constructor() { }

  ngOnInit() {
  }

  updateTable(newData: TableItem[]) {
    const data = [...newData];
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.filterValue;
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Net worth export ' + moment(Date.now()).format('YYYY-MM-DD HH:MM'),
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Networth_' + moment(Date.now()).format('YYYY-MM-DD')
    };

    const csvExporter = new ExportToCsv(options);

    const dataToExport = this.dataSource.filteredData;

    if (dataToExport.length > 0) {
      csvExporter.generateCsv(ExportHelper.mapToNetWorthExport(dataToExport));
    }
  }

  isDivinationCard(icon: string) {
    return ItemHelper.isDivinationCard(icon);
  }

  getTabNames(tabs: CompactTab[]) {
    return TableHelper.getTabNames(tabs);
  }

}
