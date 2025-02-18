import { ClassProvider, Injectable, Injector, inject } from '@angular/core';
import { interval, take, takeWhile } from 'rxjs';

export interface IccTaskSetting {
  refreshRate: number;
  lastUpdateTime: Date;
}

export interface IccTaskConfig extends IccTaskSetting {}

export interface IccTask {
  key: string;
  service?: any;
  config: IccTaskConfig;
}

@Injectable({
  providedIn: 'root',
})
export class IccTasksService {
  private injector = inject(Injector);
  private tasks: IccTask[] = [];

  loadTaskService(key: string, provide: any, config: IccTaskConfig): void {
    const injector = Injector.create({
      parent: this.injector,
      providers: [provide],
    });
    const task = {
      key: key,
      service: injector.get(provide),
      config: config,
    };
    this.tasks.push(task);
    const refreshRate = config.refreshRate * 1000;
    if (refreshRate >= 5000) {
      interval(refreshRate)
        .pipe(takeWhile(() => !!this.findTask(key)))
        .subscribe(() => this.runTasks(task));
    }
  }

  private runTasks(task: IccTask): void {
    task.service
      ?.selectConfig(task.key)
      .pipe(take(1))
      .subscribe((config: IccTaskConfig) => {
        const dt = Math.ceil((new Date().getTime() - config.lastUpdateTime.getTime()) / 1000) + 2.5;
        if (dt > config.refreshRate) {
          task.service?.runTask(config);
        }
      });
  }

  private findTask(key: string): IccTask | undefined {
    return this.tasks.find((task) => task.key === key);
  }

  removeTask(key: string): void {
    this.tasks = [...this.tasks].filter((item) => item.key !== key);
  }
}
