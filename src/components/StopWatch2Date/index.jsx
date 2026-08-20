import {Component} from 'react';

class StopWatch extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        // Початковий стан: Date об'єкт встановили на 00:00:00 (год/хв/сек)
         timer: new Date(0, 0, 0, 0, 0, 0, 0)
      };
      // властивість екз.- посередник для контрою setInterval зберігається тут а не в state тому що вона не буде викликати перерендер
      this.intervalId = null;  
    }

    // після запуску сторінки коли перший стан зарендерився(змонтувався) ми викликаємо метод start
    // для початку відліку
    componentDidMount() {
        this.start();
    }

    componentDidUpdate() {}

    // для того щоб перед розмонтуванням наш tick реально перестав тікати
    // треба в методі componentWillUnmount викликати метод stop - обовязково перед розмонтуванням скидати таймери!
    // componentWillUnmount викликається БЕЗПОСЕРЕДНЬО ПЕРЕД тим, як компонент видаляється з DOM (а не "після"). 
    // Тут обов'язково треба очищати таймери (clearInterval), щоб не було «таймерів-привидів» і витоку пам'яті (memory leak).
    componentWillUnmount() {
        this.stop()
    }

    // метод tick
    tick = () => {
        const {timer} = this.state;
        // Не змінювати стан на пряму! Стан Імутабельний!
        // краще створити проміжну змінну і її підсунути 
        // Стан ІМУТАБЕЛЬНИЙ! Створюємо новий об'єкт Date (клон), а не модифікуємо поточний у state
        // правильно зробити клонування new Date(timer.valueOf()). В React ми ніколи не робимо this.state.timer.setSeconds(...) напряму.
        const newTimer = new Date(timer.valueOf());
        // перевірка чи буде тікати коли ми натиснули stop або reset
        console.log('tick');
        // setSeconds getSeconds - це методи обєкту Date
        // Збільшуємо секунди у клоні
        newTimer.setSeconds(timer.getSeconds() + 1)
        // оновлюємо state новим обєктом
        this.setState({timer: newTimer});
        
    };

    // метод start запускає метод tick кожну секунду
    // в консолі ми побачимо баг, метод відпрацьовує 2 рази, тобто секунди йдуть по два: 2,4,6,8,10...
    // це через строгий режим реакта, він проводить додаткову перевірку для dev режима, для навчального проекту його спокійно 
    // можна відключити (закоментувати або видалити) в самому головному index.js <React.StrictMode>, це ніяк не впливає на prod 
    // режим (про це можна почитати в документації)
    // У розробці (React 18+) React.StrictMode навмисно робить подвійне монтування: Монтує -> Розмонтовує -> Монтує знову. 
    // Це робиться спеціально, щоб перевірити, чи написала ти очищення у componentWillUnmount!
    // Якщо у тебе в componentWillUnmount виклик this.stop() працює правильно, то навіть у StrictMode таймер не буде йти подвійними секундами, 
    // бо перший таймер очиститься при тестовому розмонтуванні.

    // також якщо понатискати start то запуститься декілька setInterval-ів і наш таймер буде працювати швидше ніж треба 
    // щоб цього уникнути треба зебергти id setInterval і перевіряти в start якщо id вже є то тоді не запускати його знову
    // Це класичний захист від «пачки» паралельних таймерів під час частих кліків.
    start = () => {
        // Захист від повторних кліків: запускаємо setInterval тільки якщо він ще НЕ запущений
        if (!this.intervalId) {
            this.intervalId = setInterval(this.tick, 1000);
        }
    };

    // Зупинка секундоміра
    stop = () => {
        clearInterval(this.intervalId);
        this.intervalId = null;  // // Скинули ID, щоб start() знову зміг спрацювати
    };

    // для того щоб після виконання методу reset наш tick реально перестав тікати (в т.ч. у фоні - напр console.log)
    // треба в методі reset обнулити таймер і викликати метод stop
    reset = () => {
        // Скидання на 00:00:00 та зупинка
        this.setState({timer: new Date(0, 0, 0, 0, 0, 0, 0)});
        this.stop()
    };

    render () {
        const {timer} = this.state;

        return (
            <article>
                <div>{timer.toLocaleTimeString('en-GB')}</div>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.reset}>Reset</button>
            </article>
        );
    }
     
}

export default StopWatch;
