// оскільки це все є збірка, то додатково робити git init та initial commit НЕ треба. Воно саме все зробило.
// перевірити можна git log. Ми вже лише продовжуємо необхідними комітами.

import { Component } from 'react';

// Причини перерендеру компонента в React (Три "Китових" джерела):
//     1. Зміна СТАНУ (State): викликана через setState() (у класах) або через хук useState() (у функціях).
//     2. Оновлення ПРОПСІВ (Props): коли батьківський компонент передає нові дані або сам робить перерендер.
//     3. Примусовий оновлювач: метод forceUpdate() (використовується вкрай рідко).

// Методи життєвого циклу  так називаються тому що компонент живе від початку до самого кінця (монтування, оновлення та розмонтування)
// Діють тільки для класових компонентів.

// Ці методи виконують автоматично, їх треба лише прописати а відпрацють вони самостійно
// componentDidMount - виконується тоді коли перший рендер було виконано
// componentDidUpdate - виконується після кожного оновлення (якщо дані повинні ще на щось вплинути, десь використатись)
// componentWillUnmount - виконується перед тим як розмонтувати компонент

class StopWatch extends Component {
    // rconst - сніпет для швидкого виклику конструктора в класовому реакт компоненті
    constructor(props) {
      super(props)
      // виконається першим конструктор (спрацьовує першим і лише один раз)
      console.log('1 constructor')
    
      this.state = {count:0}
    }

    // cdm - сніпет для методу componentDidMount
    // cdup - сніпет для методу componentDidUpdate
    // cwu - componentWillUnmount

    componentDidMount() {
        // виконається третім але лише один раз (після конструктора та рендера)
        console.log('3 componentDidMount');
    }

    // виконується 4 щоразу після кожного оновлення
    componentDidUpdate(prevProps, prevState) {
        console.log('4 componentDidUpdate');
    }

    // виконується 5 перед тим як розмонтувати компонент
    componentWillUnmount() {
        console.log('5 componentWillUnmount');
     }
    

    render() {
        // виконається другим рендер і буде виконуватись щоразу коли щось оновлюється
        console.log('2 render')
        const {count} = this.state;
        return (
            <>
                <div>{this.state.count}</div>
                <button onClick={()=>{this.setState({count: count + 1});}}>+</button>
            </>
        );
    }
}

export default StopWatch;

// Тобто, коли ми запускаєм сторінку вперше, компонент відпрацьовує в такому порядку:
// index.jsx:21 1 constructor
// index.jsx:43 2 render
// index.jsx:32 3 componentDidMount

// Коли щось оновлюємо (збільшуємо лічильник на кнопку) компонент відпрацьовує отак:
// installHook.js:1 2 render
// index.jsx:37 4 componentDidUpdate

//  коли розмонтовуємо, тоді відпрацьовує таак:
// 5 componentWillUnmount





