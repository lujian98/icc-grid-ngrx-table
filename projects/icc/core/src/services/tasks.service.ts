import { ClassProvider, Injectable, Injector, inject, OnDestroy } from '@angular/core';
import { takeUntil, interval, timer, Subject } from 'rxjs';

export interface IccTask<T> {
  key: string;
  service?: any;
  config?: T;
}

@Injectable({
  providedIn: 'root',
})
export class IccTasksService<T> implements OnDestroy {
  private injector = inject(Injector);
  private destroy$ = new Subject<void>();
  private tasks: IccTask<T>[] = [];

  constructor() {
    interval(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((n) => {
        console.log(' call dispatch tasks n=', n, ' tasks=', this.tasks);
        this.runTasks();
      });
  }

  private runTasks(): void {
    this.tasks.forEach((task) => {
      task.service?.runTask(task.key, task.config);
    });
  }

  loadService(key: string, provide: any, config: T): void {
    const injector = Injector.create({
      parent: this.injector,
      providers: [provide],
    });
    this.tasks.push({
      key: key,
      service: injector.get(provide),
      config: config,
    });
  }

  removeTask(key: string): void {
    this.tasks = [...this.tasks].filter((item) => item.key !== key);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
