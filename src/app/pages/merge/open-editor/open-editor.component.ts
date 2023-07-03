import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { SubSink } from 'subsink';
import { CompareManagerService } from '../../../service/compare-manager.service';
import { map } from 'rxjs';
import { OpenFileManagerService } from '../../../service/open-file-manager.service';

@Component({
  selector: 'app-open-editor',
  templateUrl: './open-editor.component.html',
  styleUrls: ['./open-editor.component.css'],
})
export class OpenEditorComponent implements OnInit, OnDestroy {
  viewFG: FormGroup<any>;

  options = {
    theme: 'vs-dark',
    language: 'plaintext',
  };

  allLanguages: string[] = [];

  sub = new SubSink();

  source = '';

  constructor(
    private fb: UntypedFormBuilder,
    private service: CompareManagerService,
    private openSrvice: OpenFileManagerService,
  ) {
    this.viewFG = this.fb.group({
      sourcePath: [''],
      language: ['plaintext'],
    });

    this.sub.sink = this.service.allLanguages.subscribe(
      (lan) => (this.allLanguages = lan || []),
    );
  }

  ngOnInit(): void {
    this.sub.sink = this.viewFG.valueChanges
      .pipe(map((v) => v.language))
      .subscribe((language) => {
        this.options = { ...this.options, language };
      });

    this.openSrvice.getSourceContent().subscribe((content) => {
      this.source = content;
    });

    this.openSrvice.openParams$.subscribe((p) => {
      this.viewFG.patchValue({
        ...p,
      });
    });
  }

  ngOnDestroy(): void {
    this.openSrvice.reset();
  }
}
