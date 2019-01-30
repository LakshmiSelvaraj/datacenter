import { Component, OnInit, OnDestroy } from '@angular/core';

interface Metric {
  used: number;
  available: number;
}

export interface Node {
  name: string;
  cpu: Metric;
  memory: Metric;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  cpu: Metric;
  memory: Metric;

  cluster1: Node[];
  cluster2: Node[];

  interval: any;

  constructor() { }

  ngOnInit() {
    this.generateData();

    this.interval = setInterval(() => {
      this.generateData();
    }, 15000);
  }

  generateData(): void {
    this.cluster1 = [];
    this.cluster2 = [];

    this.cpu = {used: 0, available: 0};
    this.memory = {used: 0, available: 0};

    for (let i = 1; i < 7; i++) {
     this.generateNodesAndUsageData(i);
    }
  }

  generateNodesAndUsageData(i: number): Node {
    const node: Node = this.generateRandomNode(i);
    this.calculateMemoryAndCpuUsage(node);
    if (i < 4) {
      this.cluster1.push(node);
    } else {
      this.cluster2.push(node);
    }
    return node;
  }


  generateRandomNode(i: number): Node {
    const node = {
      name: 'node' + i,
      cpu: {available: 16, used: this.generateRandomInteger(0, 16)},
      memory: {available: 48, used: this.generateRandomInteger(0, 48)}
    };

    return node;
  }

  generateRandomInteger(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * max) + 1;
  }

  calculateMemoryAndCpuUsage(node: Node): void {
    this.cpu.used += node.cpu.used;
    this.cpu.available += node.cpu.available;
    this.memory.used += node.memory.used;
    this.memory.available += node.memory.available;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
