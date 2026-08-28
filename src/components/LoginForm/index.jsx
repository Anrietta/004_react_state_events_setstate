import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './LoignForm.module.css'

// Єдине джерело істини
const INITIAL_VALUES = {
            email: '',
            password: '',
}

const LOGIN_FORM_REG_EXP = {
    email: /^.+@.+$/,
    password: /^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d.*)(?=.*[!@#$%^&**.].*).{8,20}$/,
}


class LoginForm extends Component {
    constructor(props) {
      super(props)
    
    //   this.state = {
    //      email: '',
    //      password: '',
    //   }

      this.state = {
            email: INITIAL_VALUES.email,
            isEmailValid: false,
            password: INITIAL_VALUES.password,
            isPasswordValid: false,
      }
    }

    handleSubmit = (e) => {
        // prevent default
        e.preventDefault();
        console.dir(e.target);
        // send request
        // clear form  - нижче не правильне рішення, недобре лазити руками в сам код (в разі зміни початкових значень наприклад)
        // краще мати окрему якусь константу змінну (за межами класу), як INITIAL_VALUES (дивись вгору)
        // this.setState({email: '', password: ''}) - не добре
        this.setState(INITIAL_VALUES)  // - добре, щоб скинути дані в інпуті після відправки форми
    }

    
    handleEmailChange = ({target:{value}}) => {
        // якщо не прописати setState і не навісити обробник на інпут то ми не зможемо вовдити там нічого і буде вилазити помилка
        this.setState({
            email: value,
            isEmailValid: LOGIN_FORM_REG_EXP.email.test(value),
        });
    }

    handlePasswordChange = ({target:{value}}) => {
        // якщо не прописати setState і не навісити обробник на інпут то ми не зможемо вводити там нічого і буде вилазити помилка
        this.setState({
            password: value,
            isPasswordValid: LOGIN_FORM_REG_EXP.password.test(value),
        });
    }

    // скоротимо два примітивні обробники згори, і зліпимо один обробник для всіх інпутів форми
    // деструктурую обєкт event, в ньому деструктурую властивості name, value
    // handleInputChange = ({target: {name, value}}) => {
    //     // змінюю state, де [name] динамічне створення назви властивості: value значення
    //     this.setState({[name]: value})
    // }

    // Task: Додати поле для пароля і прописати для нього обробник
    render() {
        const {email, password, isEmailValid, isPasswordValid} = this.state;
        console.log(isEmailValid);

        // винесем в окрему змінну рядок стилів (className) для стилізації інпута на email
        // щоб не пхати великий вираз в код
        // але цей спосіб не є дуже добрий бо одна найменша помилка призведе до помилки 
        // замість того щоб писати отаке, краще використати спеціальну бібліотечку classnames
        // яка самостійно буде додавати безумовні стилі та стилі з умовами
        // const emailClassname = `${styles.input} ${
        //     isEmailValid ? styles.inputValid : styles.inputInvalid
        // }`;

        // перепишем змінну зі стилями вже під бібліотечку classnames
        const emailClassName = classNames(styles.input, 
            {[styles.inputValid]: isEmailValid},
            {[styles.inputInvalid]: !isEmailValid},
        );
        const passwordClassName = classNames(styles.input, 
            {[styles.inputValid]: isPasswordValid},
            {[styles.inputInvalid]: !isPasswordValid},
        )

        return (
            <div className={styles.formContainer}>
                <h1 className={styles.formHeader}>
                    LogIn
                </h1>
                {/*саму форму краще виносити в окремий компонент з усім її змістом, тобто тут лишається div та h1 і посилання на компонент форми */}
                <form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <label className={styles.label}>
                        <span className={styles.inputName}>Email</span>
                        <input className={emailClassName}
                            type="email"
                            name="email" 
                            placeholder="your@mail" 
                            value ={email}  // value бере значення з state і виводиь в інпут (value -> onChange)
                            onChange={this.handleEmailChange} // onChange задає значення в state беручи його з інпут (onChange <-> value)
                            autoFocus
                        />
                    </label>
                    <label className={styles.label}>
                        <span className={styles.inputName}>Password</span>
                        <input className={passwordClassName}
                            type="password" 
                            name="password"   // назва в атриб name має співпадати з назвою властивості в state!!!! 
                            value ={password}  // value бере значення з state і виводиь в інпут (value -> onChange)
                            onChange={this.handlePasswordChange} // onChange задає значення в state беручи його з інпут (onChange <-> value)
                            minLength="4"
                        />
                    </label>
                    <button type='submit'>Login</button>
                </form>
            </div>
        );
    }
}

// стейт поставити в інпут
// інпут взяти і покласти в стейт коли в ньому вносили зміни на сторінці
// як тільки змінюється інпут то треба змінити стейт за допомог обробн onChange

// Керовані космпоненти - це html елементи (input, textarea, select...)за вміст яких React бере відповідальність на себе і сам їх 
// контролює, ними керує за допомогою state та setState() 

// INITIAL_VALUES: Захищає від помилок при скиданні форми. Якщо додасться нове 
// поле (наприклад, phone), його достатньо буде дописати в одному місці — в константі.

// [name]: value: Динамічне ключ-значення в об'єкті JavaScript. Працює так: якщо name = "email", 
// то вираз { [name]: value } перетвориться на { email: value }.

// Двосторонній зв'язок (Two-way binding): value контролює те, що користувач бачить, а onChange 
// записує те, що користувач вводить.

export default LoginForm;
