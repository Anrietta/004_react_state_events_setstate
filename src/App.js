import './App.css';
import {Component} from 'react';
// import StopWatch from './StopWatch/index.jsx';
// import ViewPortParams from './components/ViewPortParams'
// import StopWatch2Date from './components/StopWatch2Date';
// import AnimalSlider from './components/AnimalSlider/index'
// import UsersList from "./components/UsersList/index.jsx";
import TodoListExtraTask from "./components/TodoListExtraTask/index.jsx";

// перепишем App як функціональний компонент для практики з UsersList

function App (props)  {
  return <TodoListExtraTask/>;
}

// імітація щоб протестувати метод componentWillUnmount (зникнення/видалення)
// class  App extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        isVisible: true
//     }
//   }

//   handleClick = () => {
//     const {isVisible} = this.state;
//     this.setState({isVisible: !isVisible})
//   }

//   render() {
//     const {isVisible} = this.state;

//     // ТАК НЕ ПИСАТИ:
//     // if (isVisible) {
//     //   return (
//     //     <>
//     //       <StopWatch/>
//     //       <button onClick={this.handleClick}>{isVisible?'Unmount':'Mount'}</button>
//     //     </>
//     //   )
//     // }
//     // return <button onClick={this.handleClick}>{isVisible?'Unmount':'Mount'}</button>

//     return (
//       <>
//       {/*Якщо isVisible=true то оператор && далі піде шукати false і поверне StopWatch
//       Якщо sVisible=false то оператор && поверне false, але реакт ігнорує false (true, null, undefinded)
//       тому насправді не буде рендеритись нічого. У нас або буде кнопка і StopWatch або лише кнопка */}

//       {/* <button onClick={this.handleClick}>
//         {isVisible?'Unmount':'Mount'}
//       </button>
//       {isVisible && <AnimalSlider/>}  */}
//       {/* <StopWatch2Date/> */}
      
//       </>
//     )

//   }
// }

export default App;

// new Counter().render(); - отримати розмітку з класвого компонента