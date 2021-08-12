import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.handleTask = this.handleTask.bind(this);
    this.state = {
      tasks: [],
      text: ''
    }
  }

  removeTask(e) {
    let newStaks = this.state.tasks;

    newStaks.splice(e.target.id, 1);

    this.setState({
      tasks: newStaks
    });
  }

  handleTask(e) {
    let tasks = this.state.tasks;

    tasks[e.target.id].completed = !tasks[e.target.id].completed;
    
    this.setState({
      tasks: tasks
    });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text === '') {
      return
    }

    const newTask = {
      text: this.state.text,
      completed: false
    };

    this.setState({
      tasks: this.state.tasks.concat(newTask),
      text: ''
    });
  }

  render() {

    let todos = this.state.tasks.map((task, index) => <Todo removeTask={this.removeTask} handleTask={this.handleTask} key={index.toString()} id={index} value={task.text} completed={task.completed}/>)

    return (
      <div className="app">
        <Header>
          To do list app
        </Header>
        <div className="todoList">
          {todos}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Insira sua tarefa" value={this.state.text} onChange={this.handleChange} />
          <button>{this.state.tasks.length + ' Tarefas'}</button>
        </form>
      </div>
    );
  }
}

export default App;

function Header(props) {
  return (
    <div className="header">
      <span>{props.children}</span>
    </div>)
}

function Todo(props){
    let task;
    
    if (!props.completed) {
      task = <span>{props.value}</span>;
    } else {
      task = <span className="riscado">{props.value}</span>;
    }
    return (
      <div className="item">
        <div className="remove" onClick={props.removeTask} id={props.id}>
          ✖
        </div>
        <div className="task" onClick={props.handleTask} id={props.id}>
          {task}
        </div>
      </div>
    )
}