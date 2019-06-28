import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-net-worth-graph',
  templateUrl: './net-worth-graph.component.html',
  styleUrls: ['./net-worth-graph.component.scss']
})
export class NetWorthGraphComponent implements OnInit {
  @Input() data: Array<any[]>;

  options = {
    colors: ['#e91e63', '#fff'],
    is3D: true,
    backgroundColor: {
      fill: 'none',
      stroke: '#fff'
    },
    hAxis: {
      textStyle: { color: '#fff' },
      gridlines: { color: '#303030' },
      minorGridlines: { color: '#303030' }
    },
    vAxis: {
      textStyle: { color: '#fff' },
      gridlines: { color: '#303030' },
      minorGridlines: { color: '#303030' }
    },
    legend: 'none',
    chartArea: { width: '90%', height: '85%' },
    curveType: 'function'
    // series: [{ 'color': '#e91e63' }],
  };
  // moment(new Date()).add(1, 'days').toDate()   #e91e63

  constructor() {
  }

  ngOnInit() {
  }

  axisFormat(val) {
    return moment(val).format('MM-DD, LT');
  }
}
