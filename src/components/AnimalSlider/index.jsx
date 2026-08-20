import React, { Component } from 'react';
import defaultDogImg from './defaultDogImg.jpg'
import styles from './AnimalSlider.module.css'

class AnimalSlider extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         imgSrc: defaultDogImg,
         caption: 'This is some dog',
      }
      // Змінна для збереження ID таймера (не у state, щоб не викликати зайвий render)
      this.id = null;
    }

    // fetch ніколи не прописувати в render!!!
    // поперше fetch асинхронний, спершу намалюється сторінка а потім потягнуться дані, даних не буде на момент рендера
    // подруге setSttate в рендері викличе зациклення (нескінечний цикл!!!)
    loadImg = () => {
        console.log('load');
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => this.setState({imgSrc: data.message}))
            .catch(err => console.error(err));   
    }

    // автослайдер, реалізація варіант 1 : у CDM прописуємо setInterval де викликаємо loadImg, і в CWU відміняємо setInterval
    //(тут за допом setInterval викликаємо loadImg кожні 2 сек, loadImg запускає зміну стану setState і картинки змінюються)
    // варіант 2: у CDM викликаємо loadImg, в CDUP порписуємо setTimeout, в CWU знімаємо setTimeout
    //(тут зациклюємо loadImg => піля першого монтування (constructor) викликається рендер -> далі CDM який запускає loadImg -> 
    // -> loadImg запускає зміну стану setState який запускає перерендер -> після кожного рендера запускається CDUP який 
    // запускає setTimeout -> який знов запускає loadImg, яки змінює стан ....)

    componentDidMount() {
        // this.id = setInterval(this.loadImg, 2000)
        this.loadImg();
    }

    componentDidUpdate() { 
        // ВАЖЛИВО для Варіанту 2: Обов'язково очищаємо попередній таймаут перед створенням нового,
        // щоб уникнути накладання таймерів при частому оновленні компонента, натискання кнопки, тощо!
        // Компонент перемалюється, знову спрацює componentDidUpdate(), і він створить ще один setTimeout! 
        // Попередній setTimeout при цьому не очиститься, тому що ти перезапишеш this.id = setTimeout(...).
        // У результаті у тебе почнуть цокати кілька setTimeout паралельно, і слайдер почне "казитися" 
        // та міняти картинки кожні кілька мілісекунд!
        clearTimeout(this.id);
        this.id = setTimeout(this.loadImg, 2000);
    } 

    // Очищаємо таймер перед видаленням компонента з DOM,
    // щоб запобігти витоку пам'яті (Memory Leak) та спробам викликати setState на розмонтованому компоненті!
    componentWillUnmount() {
        // clearInterval(this.id);
        clearTimeout(this.id);
    }
    
    
    render() {
        const {imgSrc, caption} = this.state;

        return (
            
            <figure className={styles.sliderWrapper}>
                <img src={imgSrc} alt='Dog' />
                {/*Figure - це семантичний тег для картинок з описом*/}
                {/*figcaption не обовязковий тег для figure, але якщо він є, то він має бути завжди першим або останнім*/}
                <figcaption>{caption}</figcaption>
            </figure>
        );
    }
}

export default AnimalSlider;
