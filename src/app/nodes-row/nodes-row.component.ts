import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Node } from '../dashboard/dashboard.component';

@Component({
  selector: '[app-nodes-row]',
  templateUrl: './nodes-row.component.html',
  styleUrls: ['./nodes-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesRowComponent {
  @Input()
  node: Node;

  isDanger(prop: string) {
    return this.node[prop].used / this.node[prop].available > 0.7;
  }

}
