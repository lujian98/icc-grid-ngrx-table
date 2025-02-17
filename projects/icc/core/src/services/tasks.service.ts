import { ClassProvider, Injectable, Injector, inject } from '@angular/core';
import { interval, takeWhile } from 'rxjs';

export interface IccTaskSetting {
  refreshRate: number;
}

export interface IccTaskConfig<T> extends IccTaskSetting {}

export interface IccTask<T> {
  key: string;
  service?: any;
  config: IccTaskConfig<T>;
}

@Injectable({
  providedIn: 'root',
})
export class IccTasksService<T> {
  private injector = inject(Injector);
  private tasks: IccTask<T>[] = [];

  loadService(key: string, provide: any, config: IccTaskConfig<T>): void {
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
    if (refreshRate > 0) {
      interval(refreshRate)
        .pipe(takeWhile(() => !!this.findTask(key)))
        .subscribe(() => this.runTasks(task));
    }
  }

  private runTasks(task: IccTask<T>): void {
    task.service?.runTask(task.key, task.config);
  }

  private findTask(key: string): IccTask<T> | undefined {
    return this.tasks.find((task) => task.key === key);
  }

  removeTask(key: string): void {
    this.tasks = [...this.tasks].filter((item) => item.key !== key);
  }
}
