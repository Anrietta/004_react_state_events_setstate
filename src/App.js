import './App.css';
import {Component} from 'react';
// import StopWatch from './StopWatch/index.jsx';
// import ViewPortParams from './components/ViewPortParams'
// import StopWatch2Date from './components/StopWatch2Date';
// import AnimalSlider from './components/AnimalSlider/index'
// import UsersList from "./components/UsersList/index.jsx";
// import TodoListExtraTask from "./components/TodoListExtraTask/index.jsx";
import ThemeBtn from './components/ThemeBtn/index.jsx';
import UsersListRefactoring from "./components/UsersListRefactoring/index.jsx";

// перепишем App як функціональний компонент для практики з UsersList

// для передачі Child => Child створимо кнопку перемикання теми
// тема буде стилями задіюватись на сам ThemeBtn та на UsersListItem компонент
// тобто для передачі даних між ThemeBtn та UsersList=>UsersListItem нам потрібно задіяти App як найближчого спільного батька

//App
//  ThemeBtn (змінює напис на самій кнопці Dark/Light)
//  UsersList
//    UsersListItem (змінює колір підсвітки)

// ThemeBtn передбачає стан isLight який буде спільним і для ThemeBtn і для UsersListItem
// оскільки компонент передбачає стан,то ми робим його класовим
// і пописуємо йцей стан в App бо він спілький батьківський компонент 
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLight: true,
    }
  }

  setTheme = () => {
    const {isLight} = this.state;
    this.setState({isLight: !isLight})
  }
  render() {
    const {isLight} = this.state;

      return ( 
      <>
        <ThemeBtn isLight={isLight} changeTheme={this.setTheme}/>
        <UsersListRefactoring isLight={isLight}/>;
      </>
    )
  }

}



export default App;

