import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ApiConnectorService } from '../services/api-connector.service';
import { SharingService } from '../services/sharing.service';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList = [];
  minDate = new Date();
  @ViewChild('newTodoModal') public newTodoModal: ModalDirective;

  constructor(private apiConnector: ApiConnectorService,
              private shareService: SharingService,
              private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.refreshTodoList();
    });
  }

  refreshTodoList() {
    this.shareService.loadingEmit.emit({
      loading: true
    });

    //Getting all todo list data
    this.fetchTodoList().then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        this.todoList = data.task_list;
        this.ref.detectChanges();
      }
    );
  }

  saveTodo(todoForm: NgForm) {
    if (todoForm.invalid) {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'All Fields are required!',
        aType: 'error'
      });
      return false;
    }
    
    this.shareService.loadingEmit.emit({
      loading: true
    });
    this.createTodo(todoForm.value).then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        if (data.status === true) {
          this.refreshTodoList();
          this.newTodoModal.hide();
          todoForm.reset();
        } else {
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: data.error_msg,
            aType: 'error'
          });
        }
      }
    );
  }

  markAsComplete(element) {
    if(confirm("Are you sure to mark task as complete?")) {
      var taskId = element.getAttribute("data-task_id");
      this.shareService.loadingEmit.emit({
        loading: true
      });
      this.markComplete(taskId).then(
        (data) => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          if (data.status === true) {
            this.refreshTodoList();
          } else {
            this.shareService.alertEmit.emit({
              showAlert: true,
              aText: data.error_msg,
              aType: 'error'
            });
          }
        }
      );
    }
  }

  deleteTask(element) {
    if(confirm("Are you sure to delete task?")) {
      var taskId = element.getAttribute("data-task_id");
      this.shareService.loadingEmit.emit({
        loading: true
      });
      this.markDelete(taskId).then(
        (data) => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          if (data.status === true) {
            this.refreshTodoList();
          } else {
            this.shareService.alertEmit.emit({
              showAlert: true,
              aText: data.error_msg,
              aType: 'error'
            });
          }
        }
      );
    }
  }

  /* API Related space */

  async fetchTodoList() {
    return await this.apiConnector.getAllTodos();
  }

  async createTodo(postData) {
    return await this.apiConnector.postTodo(postData);
  }

  async markComplete(taskId) {
    return await this.apiConnector.markTodoComplete({}, taskId);
  }

  async markDelete(taskId) {
    return await this.apiConnector.deleteTodo(taskId);
  }

}
