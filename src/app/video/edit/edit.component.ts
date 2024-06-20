import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModelService } from 'src/app/services/model.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';
  inSubmission = false;
  @Output() update = new EventEmitter();

  clipId = new FormControl('');
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipId,
  });

  constructor(private model: ModelService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.model.register('editClip');
  }

  ngOnDestroy(): void {
    this.model.unregister('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = false;
    this.showAlert = false;
    this.clipId.setValue(this.activeClip.docID as string);
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this.clipService.updateClip(
        this.clipId.value as string,
        this.title.value as string
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Error updating clip! try again later.';
      return;
    }

    this.activeClip.title = this.title.value as string;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Clip updated successfully!';
  }
}
