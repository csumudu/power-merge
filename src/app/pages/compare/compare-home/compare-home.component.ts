import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { CompareManagerService } from '../../../service/compare-manager.service';
import { SubSink } from 'subsink';
import { filter, map } from 'rxjs';
import { languages } from '../../../service/languages';

@Component({
  selector: 'app-compare-home',
  templateUrl: './compare-home.component.html',
  styleUrls: ['./compare-home.component.css'],
})
export class CompareHomeComponent implements OnDestroy {
  initMode = {
    code: '',
    language: 'rust',
  };

  options = {
    theme: 'vs-dark',
    originalEditable: true,
    automaticLayout: true,
    diagnosticsOptions: {
      enableSyntaxValidation: false,
    },
  };
  originalModel: DiffEditorModel = {
    ...this.initMode,
  };

  modifiedModel: DiffEditorModel = {
    ...this.initMode,
  };

  compareCofigFG: FormGroup<any>;

  allLanguages: string[] = [];

  sub = new SubSink();

  constructor(private fb: FormBuilder, private service: CompareManagerService) {
    this.compareCofigFG = this.fb.group({
      sourcePath: ['', [Validators.required]],
      targetPath: ['', [Validators.required]],
      language: ['plaintext'],
    });

    this.sub.sink = this.service.getSourceContent().subscribe((c) => {
      this.originalModel = { ...this.originalModel, code: c };
    });

    this.sub.sink = this.service
      .getTargetConent()
      .subscribe(
        (c) => (this.modifiedModel = { ...this.modifiedModel, code: c }),
      );

    this.sub.sink = this.service.allLanguages.subscribe(
      (lan) => (this.allLanguages = lan || []),
    );

    this.sub.sink = this.compareCofigFG.valueChanges
      .pipe(map((v) => v.language))
      .subscribe((language) => {
        this.originalModel = { ...this.originalModel, language };
        this.modifiedModel = { ...this.modifiedModel, language };
      });

      this.service.compareParams$.subscribe(p=>{
        this.compareCofigFG.patchValue({...p})
      })
  }
  ngOnDestroy(): void {
    this.service.reset();
  }

  onSourceClick(type: string) {}

  clear() {
    this.service.reset();
  }

  onBack() {}
}
