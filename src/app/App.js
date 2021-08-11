import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTask = this.removeTask.bind(this);
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

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text === '') {
      return
    }

    const newTask = {
      text: this.state.text
    };

    this.setState({
      tasks: this.state.tasks.concat(newTask),
      text: ''
    });
  }

  render() {

    let todos = this.state.tasks.map((task, index) => <Todo removeTask={this.removeTask} key={index.toString()} id={index} value={task.text} />)

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

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleTask = this.handleTask.bind(this);
    this.state = {
      completed: false
    };
  }

  handleTask() {
    this.setState({
      completed: !this.state.completed
    });
  }

  render() {
    let task;
    
    if (!this.state.completed) {
      task = <span>{this.props.value}</span>;
    } else {
      task = <span className="riscado">{this.props.value}</span>;
    }
    return (
      <div className="item">
        <div className="remove" onClick={this.props.removeTask} id={this.props.id}>
          ✖
        </div>
        <div className="task" onClick={this.handleTask}>
          {task}
        </div>
      </div>
    )
  }
}