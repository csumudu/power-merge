import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { CompareManagerService } from '../../../service/compare-manager.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-compare-home',
  templateUrl: './compare-home.component.html',
  styleUrls: ['./compare-home.component.css'],
})
export class CompareHomeComponent {
  options = {
    theme: 'vs-dark',
  };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'text/plain',
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'text/plain',
  };

  compareCofigFG: FormGroup<any>;

  sub = new SubSink();

  constructor(private fb: FormBuilder, private service: CompareManagerService) {
    this.compareCofigFG = this.fb.group({
      sourceFolderPath: ['', [Validators.required]],
      targetFolderPath: ['', [Validators.required]],
    });

    this.sub.sink = this.service.getSourceContent().subscribe((c) => {
      this.originalModel = { ...this.originalModel, code: c };
    });

    this.sub.sink = this.service
      .getTargetConent()
      .subscribe(
        (c) => (this.modifiedModel = { ...this.modifiedModel, code: c }),
      );
  }

  onSourceClick(type: string) {}

  clear() {}

  onBack() {}
}
