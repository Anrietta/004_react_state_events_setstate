// будемо отримувати параметри в'юпорта і виводити їх на екран
// тобто коли ми будемо зменшувати і збільшувати в'юпорт то його параметри(характеристики) мають динамічно змінюватись і виводитись на екран

import React, { Component } from 'react';

// створюємо класовий компонент тому що ми хочемо динамічно змінювати характеристики, а для цього нам потрібен стан
class ViewPortParams extends Component {
    constructor(props) {
      super(props)
    
      // обовязково створюємо стан характеристик в'юпорта для першого рендера при завантаженні
      this.state = {
         x: window.innerWidth,
         y: window.innerHeight
      }
    }

    // створимо обробник в якому будемо перезаписувати характеристики в'юпорта в стані
    resizeHandler = () => {
        this.setState({x: window.innerWidth, y: window.innerHeight});
    }

    // використовуємо метод компонента componentDidMount, тобто коли відбувся перший рендер, то одразу навішуємо обробник
    // на window на подію resize - кожна зміна розміру в'юпорта буде перезаписувати характеристики
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler); 
    }

    // щоб не захаращувати память коду гарним тоном є знімати навішені обробники після розмонтування компонента
    // знмаєм з тими ж параметрами що і навішували але метод removeEventListener
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Метод render() викликається при першому завантаженні (монуванні) та при кожній зміні state або props.
    // Вже при першому рендері ми отримуємо характеристики в'юпорта зі state.
    // Одразу після першого рендеру один раз спрацьовує componentDidMount() (де ми вішаємо слухач resize).
    // Далі кожна зміна стану через setState() автоматично запускає повторний render().
    render() {

        const {x, y} = this.state;
        return (
            <div>Width:{x}, Height: {y}</div>
        );
    }
}

export default ViewPortParams;
