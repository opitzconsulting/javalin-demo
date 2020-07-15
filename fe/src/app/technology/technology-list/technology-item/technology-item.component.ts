import {Component, Input, OnInit} from '@angular/core';
import {Technology} from '../../../technology.model';
import {TechnologyService} from '../../technology.service';

@Component({
  selector: 'app-technology-item',
  templateUrl: './technology-item.component.html',
  styleUrls: ['./technology-item.component.scss'],
})
export class TechnologyItemComponent implements OnInit {
  @Input() technology: Technology;
  @Input() technologyId: number;

  constructor(private technologyService: TechnologyService) {
  }

  ngOnInit() {
  }


}
