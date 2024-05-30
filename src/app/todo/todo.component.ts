import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodo: string = '';

  constructor() {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => (this.todos = data.slice(0, 10)))
      .catch((error) => console.error('Error fetching todos:', error));
  }

  addTodo() {
    if (this.newTodo.trim() === '') return;
    const todo = {
      id: this.todos.length + 1,
      title: this.newTodo,
      completed: false,
    };
    // Bug 1: Incorrectly updating state
    this.todos.push(todo);
    this.newTodo = '';
  }

  toggleTodoCompletion(todo: any) {
    // Bug 2: Mutating state directly
    todo.completed = !todo.completed;
  }
}
