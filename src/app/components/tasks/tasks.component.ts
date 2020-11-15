import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  getTasks(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.tasks = tasks.slice(0, 10)));
  }

  addTask(title: string): void {
    title = title.trim();

    if (!title) {
      return;
    }

    this.taskService.addTask({ title } as Task).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
