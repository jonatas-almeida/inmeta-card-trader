import { Injectable } from '@angular/core';
import Alert from '../../interfaces/components/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertLabel: string = "";
  private alertDescription: string = "";
  private alertKind: string = "";
  private alertShow: boolean = false;
  private alertDuration: number = 4000;

  constructor() { }

  // Getters
  public getAlertLabel(): string {
    return this.alertLabel;
  }

  public getAlertDescription(): string {
    return this.alertDescription;
  }

  public getAlertDuration(): number {
    return this.alertDuration;
  }

  public getAlertKind(): string {
    return this.alertKind;
  }

  public getAlertShow(): boolean {
    return this.alertShow;
  }

  // Setters
  private setAlertLabel(label: string) {
    this.alertLabel = label;
  }

  private setAlertDescription(description: string) {
    this.alertDescription = description;
  }

  private setAlertKind(kind: string) {
    this.alertKind = kind;
  }

  private setAlertDuration(duration: number) {
    this.alertDuration = duration;
  }

  private setAlertShow(show: boolean) {
    this.alertShow = show;
  }


  // Abre o componente de Alert
  public open(alertOptions: Alert): void {
    const alertComponentRef = document.getElementById(alertOptions.id);

    if(alertComponentRef && alertOptions) {
      this.setAlertLabel(alertOptions.label);
      this.setAlertDescription(alertOptions.description);
      this.setAlertKind(alertOptions.kind);
      this.setAlertDuration(alertOptions.duration ?? 4000);
      this.setAlertShow(true);

      setTimeout(() => {
        this.setAlertShow(false);
      }, this.getAlertDuration());
    }
  }

}
