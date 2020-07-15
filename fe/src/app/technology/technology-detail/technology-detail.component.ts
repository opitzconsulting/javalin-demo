import { Component, OnInit } from '@angular/core';
import {Technology} from '../../technology.model';
import {TechnologyService} from '../technology.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-technology-detail',
  templateUrl: './technology-detail.component.html',
  styleUrls: ['./technology-detail.component.scss']
})
export class TechnologyDetailComponent implements OnInit {
  selectedTechnology: Technology;
  technologyId: number;

  constructor(private technologyService: TechnologyService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        const id = 'id';
        this.technologyId = +params[id];
        this.technologyService.getTechnology(this.technologyId)
          .subscribe(technology => this.selectedTechnology = technology);
      }
    );
  }

  onEdit() {
    this.router.navigate([ '/technology', this.technologyId, 'bearbeiten']);
  }

  // delete Technology
  onDelete(technology: Technology): void {
    console.log(technology);
    this.technologyService.deleteTechnology(technology).subscribe(() =>
      this.router.navigate(['/technology']));
  }


}
