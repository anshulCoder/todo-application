import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ApiConnectorService } from '../services/api-connector.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList = [];

  constructor(private apiConnector: ApiConnectorService,
              private shareService: SharingService,
              private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.refreshTodoList();
  }

  ngAfterViewChecked(){
    this.ref.detectChanges();
  }

  refreshTodoList() {
    this.shareService.loadingEmit.emit({
      loading: true
    });

    //Getting all todo list data
    this.ref.markForCheck();
    this.fetchTodoList().then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        console.log(data.task_list);
        this.todoList = data.task_list;
      }
    );
  }

  addNewTask() {

  }

  markAsComplete(element) {

  }

  deleteTask(element) {
  
  }

  /* API Related space */

  async fetchTodoList() {
    return await this.apiConnector.getAllTodos();
  }

}
