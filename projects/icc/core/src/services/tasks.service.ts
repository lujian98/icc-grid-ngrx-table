import { ClassProvider, Injectable, Injector, inject } from '@angular/core';
import { interval, take, takeWhile } from 'rxjs';

export interface IccTaskConfig {
  refreshRate: number;
}

export interface IccTaskSetting {
  lastUpdateTime: Date;
}

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
      ?.selectSetting(task.key)
      .pipe(take(1))
      .subscribe((setting: IccTaskSetting) => {
        const dt = Math.ceil((new Date().getTime() - setting.lastUpdateTime.getTime()) / 1000) + 2.5;
        if (dt > task.config.refreshRate) {
          task.service?.runTask(setting);
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
