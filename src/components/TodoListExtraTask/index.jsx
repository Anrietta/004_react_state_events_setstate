import { Component } from 'react';

// Уяви, що з сервера прийшов масив завдань. Тобі потрібно відобразити їх на сторінці й дати можливість 
// користувачу перемикати стан виконання (виконано / не виконано) по кліку на завдання.
// Що має робити компонент TodoList:
// У constructor / state:
// Зберегти масив tasksData у state.tasks.
// Важливо: до кожного об'єкта завдань потрібно додати нове поле isDone: false (за допомогою map та spread-оператора ...).
// Метод toggleTask(id):
// Приймає id завдання, на яке клікнули.
// Знаходить це завдання за допомогою findIndex.
// Імутабельно (через копіювання [...tasks] та {...tasks[foundIndex]}) змінює isDone на протилежне значення (!isDone).
// Оновлює state.
// Метод mapTask(task) (або стрілкова функція всередині map):
// Повертає елемент <li>.
// key: повинен містити task.id.
// style: якщо task.isDone === true, текст має ставати закресленим (textDecoration: 'line-through'), якщо false — нормальним (textDecoration: 'none').
// onClick: при кліку викликає this.toggleTask(task.id).
// Метод render():
// Виводить список <ul> з масивом завідображених елементів <li>.

const tasksData = [
  { id: 't-1', title: 'Купити молоко', priority: 'high' },
  { id: 't-2', title: 'Прибрати в кімнаті', priority: 'medium' },
  { id: 't-3', title: 'Вивчити списки в React', priority: 'high' },
];

class TodoListExtraTask extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         tasks : tasksData.map(task => ({...task, isDone: false}))
      }
    }

    toggleClass = (id) => {
        const {tasks} = this.state;
        const foundTaskIndex = tasks.findIndex(t => t.id === id);
        const newTasks = [...tasks];
        newTasks[foundTaskIndex] = {
            ...newTasks[foundTaskIndex], 
            isDone: !newTasks[foundTaskIndex].isDone}

        this.setState({tasks: newTasks});    
    }

    mapTasks = (task) => {
        const styles = {textDecoration: task.isDone ? 'line-through': 'none'};

        return (
            <li key={task.id} style={styles} onClick={()=>{this.toggleClass(task.id)}}>
                {task.title}
            </li>
        )
    }

    render() {
        const {tasks} = this.state;
        return (
            <ul>{tasks.map(this.mapTasks)}</ul>
        );
    }
}

export default TodoListExtraTask;
