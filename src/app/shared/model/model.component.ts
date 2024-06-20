import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  // providers: [ModelService],
})
export class ModelComponent implements OnInit, OnDestroy {
  @Input() modelId = '';

  closeModel() {
    this.model.toggleModel(this.modelId);
  }
  constructor(public model: ModelService, public el: ElementRef) {}
  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }
}
