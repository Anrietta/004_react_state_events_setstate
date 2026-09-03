import React, { Component } from 'react';
import getUsers from './api/index.js'

class UsersLoader extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        // це базовий набір стартових станів для реалізації завантаження списків 
        // користувачів з пагінацією, з передбаченням можливих помилок та стану завантаження
         users: [
            {id: 1, name: 'Ivo'},
            {id: 2, name: 'Wally'}
         ],  // стартовий масив юзерів до fetch()
         isFetching: false,  //маячок чи йде зараз завантаження даних
         error : null,  // маячок на випадок помилок
         currentPage: 1,  // стартова сторінка для реалізації пагінації
      }
    }

    // при кожному кліку на кнопку перемикання сторінки ми скачуємо нову порцію користувачів
    loadUsers =() => {
        const {currentPage} = this.state;

        this.setState({isFetching: true});  // виводим спінер завантаження одразу перед початком самого завантаж
    
        // звернення до сервера краще виносити в окрему функцію, оскільки це окреме віконечко назовні
        // якщо у нас всі зверненн ябудуть розкидані по компонентам то буде важко підтримувати код
        // тому тут напряму fetch не будемо застосовувати
        // fetch(`https://randomuser.me/api/?results=10&seed=pe2022&page=${currentPage}`)
        // .then(response => response.json())

        // замість цього викличемо нашу функцію getUsers з api і передамо обєкт опцій
        // але передавати постійно купу опцій геморно, можна залишити ті які змінюються а інші зробити дефолтними в ф-ї api/getUsers
        getUsers({
            page: currentPage,
            results: 5,
            // seed: 'pe2022',
            // inc: ['name', 'gender', 'email', 'login'],
        })

        // отримую data і зразу деструктурую щоб отримати results
        .then(({results}) => this.setState({users: results}))
        .catch(e => this.setState({error: e}))
        .finally(()=> this.setState({isFetching: false}));  // в будь якому разі error чи ні скидаю спінер завантаж
    }

    componentDidMount() {
        this.loadUsers();
    }

    //              попер.пропси   попер.стан  - реактівські параметри
    componentDidUpdate(prevProps, prevState) { 
        const {currentPage} = this.state;

        // щоб уникнути рекурсі обовязково порписуємо умову для оновлення списку юзерів при зміні стану currentPage
        // якщо currentPage поточний, не дорівнює тому що був попередній то завантажимо новий юзерів
        if (currentPage !== prevState.currentPage) {
            this.loadUsers();
        }

    } 

    nextPage = () => {
        const {currentPage} = this.state;
        this.setState({currentPage: currentPage + 1});  // це мутація даних чи ні ???
    }

    prevPage = () => {
        const {currentPage} = this.state;
        if (currentPage > 1) {
            this.setState({currentPage: currentPage - 1});  // це мутація даних чи ні ???
        }
    }

    render() {
        const {users, isFetching, error} = this.state;

        return (
            <>
                {/*Якщо error = truthy то відрендерь повідомлення по помилку */}
                {error && <div>!!!Error!!! {JSON.stringify(error.message)}</div>}

                {/*Якщо isFetching = truthy то відрендерь повідомлення про завантаження */}
                {isFetching && <div>Loading! Please wait...</div>}

                {/* Інакше! Якщо нема помилки і дані не завантажуються то вивести список (якщо error = true то !error = false - тоді 
                вираз повертає false і нічо не рендерить. Якщо isFetching = true то  !isFetching = false вираз повертає false
                і нічо не рендерить.
                Якщо error=falsy та isFetching = falsy то !error = true і !isFetching = true то вираз завжди повертає останній 
                складник - тобто в нашому випадку розмітку на редер)*/}
                {!error && !isFetching && (
                    <>
                        {/*Кнопки для перемикання сторінок (Pagination) */}
                        <button onClick={this.prevPage}>{'<'}</button>
                        <button onClick={this.nextPage}>{'>'}</button>
                        <ul>
                            {/* JSON.stringify(u) - просто щоб змусити React вивести обєкт юзера як рядок*/}
                            {users.map(u => (
                                <li key={u.id.login}>{JSON.stringify(u)}</li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    }
}

export default UsersLoader;

