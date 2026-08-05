// import React from 'react';


// це функціональний компонент, тому що написаний за допомогою функції
// function Counter () {

//     let count = 0;

//     // count збільшується в консоль виводиться але на сторінці не перемальовується, 
//     // це тому що в реакті потрібно використовувати Стан (State)
//     // а Стан треба використовувати в Класових компонентах,тобто ті що реалізовані за допомогою класів
//     return (
//         <>
//             <div>{count}</div>
//             <button onClick={()=>{
//                 count++;
//                 console.log(count);
//             }}>+</button>
//         </>

//     )
// }

// це класовий компонент, тому що він написаний за допомогою Класу а не функції
// rcc - сніпет для швидкого створення класового компонента
import React, { Component } from 'react';

// Стан компонента описується в конструкторі класу
class Counter extends Component {
    constructor(props) {
        super(props);

        // початковий стан
        this.state ={
            count: 0,
        }
    }

    // тут використана стрілкова функція бо інакше в звичайній функції this втрачає контекст і повертає undefined
    // а стрілкова функція не має власного контексту і бере його з оточення де вона оголошена
    // ще як варіант можна прописати обробник як властивість інстанса в конструкторі і за допомогою bind зафіксувати контекст this.
    increment = () => {
        // setState(тут вказуємо зміни в стані) - метод React Component для перерендера сторінки (зміни стану) - іншого варіанту динамічно оновлювати стоірнку нема
        this.setState({count:this.state.count + 1})
        console.log(this.state.count);
    }

    decrement = () => {
        if (this.state.count > 0) {
            this.setState({count: this.state.count - 1})
            console.log(this.state.count);
        }
    }

    render() {
        return (
            <>
                <Count count={this.state.count}/>
                <div>{this.state.count}</div>
                <button onClick={this.increment}>+</button>
                 <button onClick={this.decrement}>-</button>
            </>
        );
    }
}


function Count ({count}) {
    return <div>I will rerender your count using only fresh props: {count}</div>
}

export default Counter;
