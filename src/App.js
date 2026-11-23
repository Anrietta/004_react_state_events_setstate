import './App.css';
import ImageWrapper from './components/PropChildrenImageWrapper';
// import LoginForm from './components/LoginForm/index.jsx';
// import PropChildrenAnimalSliderRefactor from './components/PropChildrenAnimalSliderRefactoring/index.jsx'

// перепишем App як  компонент для практики з LoginForm та UsersLoader

function App () {
  return (
    <ImageWrapper width='400px' height='300px' title='image' tabIndex={1}>
      <img 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlh0xz2IFyqw2rS-vba9NyWd1sBovXfN-pwo7gmZtpQA&s=10' 
        alt='nature'
      />
    </ImageWrapper>
  )
}


// // переписую функцію App під тему проп Children
// // створюю на місці маленький компонент для практики
// const MyPropChildrenCopmponent =props => {
//   console.log(props);

//   // 2. тут виводимо на сторінку проп children який сформований в App
//   return props.children;
// }


// /* 1. тут ми формуємо сам проп children */
// function App () {
//   return (
//     <MyPropChildrenCopmponent>
//       <div>Hi</div>
//     </MyPropChildrenCopmponent>
//   )
// }



// // переписую функцію App щоб реалізувати NamedList із заголовком з name для практики props.children 
// // створюю на місці маленький компонент для практики
// const MyPropChildrenCopmponent = ({name, children}) => {
//   console.log(children);

//   // 2. тут виводимо на сторінку проп children який сформований в App
//   return (
//     <>
//       <h3>{name}</h3>
//       <ul>{children}</ul>
//     </>
//   )
// }


// /* 1. тут ми формуємо сам проп children */
// function App () {
//   return (
//     <MyPropChildrenCopmponent name="Odd List">
//       <li>1</li>
//       <li>3</li>
//       <li>5</li>
//     </MyPropChildrenCopmponent>
//   )
// }

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

