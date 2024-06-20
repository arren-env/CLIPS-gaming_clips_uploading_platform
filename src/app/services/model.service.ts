import { Injectable } from '@angular/core';

interface IModel {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private models: IModel[] = [];

  constructor() {}

  register(id: string) {
    this.models.push({
      id,
      visible: false,
    });
  }

  unregister(id: string) {
    this.models = this.models.filter((e) => e.id === id);
  }

  isModelOpen(id: string): boolean {
    return !!this.models.find((e) => e.id === id)?.visible;
  }

  toggleModel(id: string) {
    const model = this.models.find((e) => e.id === id);
    if (model) {
      model.visible = !model.visible;
    }
  }
}
