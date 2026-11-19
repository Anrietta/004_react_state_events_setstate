import './App.css';
// import LoginForm from './components/LoginForm/index.jsx';
import SassAnimalsSliderRefactor from './components/SassAnimalSliderRefactor/index.jsx'

// перепишем App як  компонент для практики з LoginForm та UsersLoader

function App () {
  return <SassAnimalsSliderRefactor/>
}

// import {Component} from 'react';
// import './App.css';
// import ThemeBtn from './components/ThemeBtn';
// // import LoginForm from './components/LoginForm/index.jsx';
// import UsersList from './components/UsersListRefactoring'

// // перепишем App як  компонент для UsersListRefactoring

// class App extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        isLight: true,
//     }
//   }

//   setTheme = () => {
//     const {isLight} = this.state;
//     this.setState({isLight: !isLight})
//   }

//   render() {
//     const {isLight} = this.state;
//     return (
//       <>
//           <ThemeBtn isLight={isLight} changeTheme={this.setTheme}/>
//           <UsersList isLight={isLight}/>
//       </>
//     )
//   }

// }



export default App;

