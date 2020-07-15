import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Technology} from '../../technology.model';
import {TechnologyService} from '../technology.service';
import {Router} from '@angular/router';
import {Tag} from '../../tag.model';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {
  technologies: Technology[];
  // TODO search for a better solution for the filter
  allTechnologies: Technology[];
  filterActive = false;
  filterForm: FormGroup;
  tags: Tag[];
  stringTags: string[] = [];
  // search Title from Header
  searchValue: string;
  // store cur Tag
  selTag: FormControl;

  @ViewChild('tagName', {static: false}) curTag: ElementRef;
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  // autocomplete tag search
  searchTag = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.stringTags
        : this.stringTags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private technologyService: TechnologyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.technologyService.getTechnologies().subscribe(
      technologies => {
        // TODO nicht schön zweimal referenziert um filter zurückzusetzen
        this.technologies = technologies;
        this.allTechnologies = technologies;
        console.log('List update');
      }
    );
    this.technologyService.getTags().subscribe(tags => {
      this.tags = tags;
      this.tags_toString();
    });

    this.filterForm = this.fb.group({
        relevance: null,
        recommendation: null,
        complexity: null,
        filTags: this.fb.array(
          []
        )
      }
    );
    this.technologyService.currentSearch.subscribe(searchValue => this.searchValue = searchValue);
  }

  onSubmit() {
    const newFilter = this.filterForm.getRawValue();
    this.filterTechnologies(newFilter.filTags, newFilter.relevance, newFilter.recommendation, newFilter.complexity);
    this.filterActive = true;
  }

  removeFilter() {
    this.technologies = this.allTechnologies;
    const filTags = (this.filterForm.get('filTags') as FormArray);
    while (filTags.length !== 0) {
      filTags.removeAt(0);
    }
    this.filterForm.reset();
    this.filterActive = false;
  }

  get filTags() {
    return this.filterForm.get('filTags') as FormArray;
  }

  addTag(tag: string) {
    this.selTag = this.fb.control(tag, [Validators.required, this.validateTagValidator.bind(this)]);
    if (this.selTag.valid) {
      this.selTag.disable();
      this.filTags.push(this.selTag);
      this.curTag.nativeElement.value = '';
    }
  }

  removeFilterTag(index: number) {
    (this.filterForm.get('filTags') as FormArray).removeAt(index);
  }

  tags_toString() {
    for (const tag of this.tags) {
      this.stringTags.push(tag.tag);
    }
  }

  // Validator only existing Tags are allowed as input
  validateTagValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const valid = this.stringTags.includes(control.value);
    if (!valid) {
      return { tagValid: true};
    }
    return null;
  }

  sort(value: number) {
    switch (value) {
      case 0:
        this.technologies.sort((a, b) =>
        a.relevance < b.relevance ? 1 : 0);
        break;
      case 1:
        this.technologies.sort((a, b) =>
          a.recommendation < b.recommendation ? 1 : 0);
        break;
      case 2:
        this.technologies.sort((a, b) =>
          a.complexity > b.complexity ? 1 : 0);
        break;
    }
  }

  // TODO Tags have no referential integrity....
  filterTechnologies( tags: string[], relevance: number, recommendation: number, complexity: number) {
    const filteredTechnologies: Technology[] = [];
    // const filterTechnologies: Technology[] = this.technologies.slice(0, 3);
    for (const technology of this.technologies) {
      // check relevance
      if (relevance !== null && technology.relevance < relevance) {
        continue;
      }
      // check recommendation
      if (recommendation != null && technology.recommendation < recommendation) {
        continue;
      }
      // check complexity
      if (complexity != null && technology.complexity > complexity) {
        continue;
      }
      // check tags (with or concatenation):
      let containsTag = false;
      if (tags.length !== 0) {
        containsTag = this.checkTags(technology, tags);
        if (!containsTag) {
          continue;
        }
      }
      filteredTechnologies.push(technology);
    }
    this.technologies = filteredTechnologies;
  }

  checkTags(technology: Technology, tags: string[]) {
    for (const selTag of tags) {
      for (const techTag of technology.tags) {
        if (selTag.toLowerCase() === techTag.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

}

