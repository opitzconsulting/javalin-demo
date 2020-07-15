import { Component, OnInit } from '@angular/core';
import {TechnologyService} from '../technology/technology.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private searchSubject: Subject<string> = new Subject();
  private searchValue: string;
  test: string;

  constructor(private technologyService: TechnologyService, public router: Router) { }

  ngOnInit() {
    this.technologyService.currentSearch.subscribe(searchValue => this.searchValue = searchValue);
    this.setSearchSubscription();
  }

  public updateSearch(searchTextValue: string) {
    this.searchSubject.next(searchTextValue);
  }

  private setSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      this.technologyService.changeSearch(searchValue);
    });
  }

  // testBe() {
  //   this.technologyService.getDesc().subscribe(
  //     data => {
  //       this.test = data;
  //       console.log(data);
  //     }
  //   );
  // }

}
