import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TechnologyService} from '../technology.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Technology} from '../../technology.model';
import {Tag} from '../../tag.model';

@Component({
  selector: 'app-technology-edit',
  templateUrl: './technology-edit.component.html',
  styleUrls: ['./technology-edit.component.scss']
})
export class TechnologyEditComponent implements OnInit {
  technologyForm: FormGroup;
  notEmpty = false;
  private technologyIndex: number;

  private isNew = true;
  private technology: Technology;

  @ViewChild('tagName', {static: false}) curTag: ElementRef; // nicht schön

  constructor(private technologyService: TechnologyService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let technologyName = null;
    let technologyDescription = null;
    let technologyRelevance = null;
    let technologyRecommendation = null;
    let technologyComplexity = null;
    let technologyUrl = null;
    const technologyTags = new FormArray([]);

    // TODO keine schöne Lösung => redundanter Code...
    this.activatedRoute.params.subscribe(
      params => {
          if (params.hasOwnProperty('id')) {
            this.isNew = false;
            this.technologyIndex = +params[`id`];
            console.log(this.technologyIndex);
            // this.getEditTechnology();
            this.technologyService.getTechnology(this.technologyIndex)
              .subscribe(technology =>  {
                this.technology = technology;
                if (this.technology.hasOwnProperty('tags')) {
                  for (const tag of this.technology.tags) {
                    technologyTags.push(
                      new FormGroup( {
                        tag : new FormControl(tag, Validators.required)
                      })
                    );
                  }
                }
                technologyName = this.technology.name;
                technologyDescription = this.technology.description;
                technologyRelevance = this.technology.relevance;
                technologyRecommendation = this.technology.recommendation;
                technologyComplexity = this.technology.complexity;
                technologyUrl = this.technology.url;
                this.technologyForm = new FormGroup({
                  name: new FormControl(technologyName, Validators.required),
                  description: new FormControl(technologyDescription, Validators.required),
                  relevance: new FormControl(technologyRelevance, Validators.required),
                  recommendation: new FormControl(technologyRecommendation, Validators.required),
                  complexity: new FormControl(technologyComplexity, Validators.required),
                  url: new FormControl(technologyUrl, Validators.compose([Validators.required,
                    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])),
                  tags: technologyTags,
                });
              });
            console.log(this.technology);

          } else {
            this.isNew = true;
            this.technology = null;
            this.technologyForm = new FormGroup({
              name: new FormControl(technologyName, Validators.required),
              description: new FormControl(technologyDescription, Validators.required),
              relevance: new FormControl(technologyRelevance, Validators.required),
              recommendation: new FormControl(technologyRecommendation, Validators.required),
              complexity: new FormControl(technologyComplexity, Validators.required),
              url: new FormControl(technologyUrl, Validators.compose([Validators.required,
                Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])),
              tags: technologyTags,
            });
          }
        }
      );

  }

  get name() { return this.technologyForm.get('name'); }

  get description() { return this.technologyForm.get('description'); }

  get relevance() { return this.technologyForm.get('relevance'); }

  get recommendation() { return this.technologyForm.get('recommendation'); }

  get complexity() { return this.technologyForm.get('complexity'); }

  get url() { return this.technologyForm.get('url'); }


  onSubmit() {
    if (this.technologyForm.valid) {
      const newTechnology = this.technologyForm.value;
      if (this.isNew) {
        // convert form tags to string array TODO function for this
        const strTags = [];
        for (const tag of newTechnology.tags) {
          strTags.push(tag.tag);
        }
        newTechnology.tags = strTags;
        console.log(newTechnology);
        for (const tag of strTags) {
          this.technologyService.addTag({tag} as Tag).subscribe();
        }
        this.technologyService.addTechnology(newTechnology)
          .subscribe(() => this.onNavigateBack());
      } else {
        // first change this.technology values before transfer
        this.technology.name = newTechnology.name;
        this.technology.description = newTechnology.description;
        this.technology.relevance = newTechnology.relevance;
        this.technology.recommendation = newTechnology.recommendation;
        this.technology.complexity = newTechnology.complexity;
        // Convert Form Control Array to String Array
        const strTags = [];
        const newTags = [];
        for (const tag of newTechnology.tags) {
          strTags.push(tag.tag);
          if (!this.technology.tags.includes(tag.tag)) {
            newTags.push(tag.tag);
          }
        }
        this.technology.tags = strTags;
            // TODO remove redundant code
        for (const tag of newTags) {
          this.technologyService.addTag({tag} as Tag).subscribe();
        }
        this.technologyService.editTechnology(this.technology)
          .subscribe(() => this.onNavigateBack());
      }
    } else {
      this.notEmpty = true;
    }
  }

  onCancel() {
    this.onNavigateBack();
  }

  onNavigateBack() {
    this.router.navigate(['/']);
  }

  onAddTagControl(tag: string) {
    (this.technologyForm.get('tags') as FormArray).push(
      new FormGroup( {
        tag: new FormControl(tag, Validators.required)
      }));
    this.curTag.nativeElement.value = '';
  }

  removeTagControl(index: number) {
    (this.technologyForm.get('tags') as FormArray).removeAt(index);
  }

}

