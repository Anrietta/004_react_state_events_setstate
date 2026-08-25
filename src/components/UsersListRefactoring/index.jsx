import { Component } from 'react';
import UsersListItem from './UsersListItem';

// попередній компонент UsersList мав одну проблему, це дві зони відповідальності:
// 1. робота зі списком
// 2. робота з кожним елементом зі списка

// Тому тут ми розїбємо цей великикй компонент на два менші.
// Де зберігати кожен з них ?
// якщо вони в коді більше ніде не використовуються то можна зберігати в самому компоненті UsersList
// якщо він ще десь в коді використовується то зберегти як окремий компонент в components

const usersData = [
            {id: 1, firstName: 'Test', lastName: 'Testovich'},
            {id: 2, firstName: 'Test2', lastName: 'Testovich2'},
            {id: 3, firstName: 'Test3', lastName: 'Testovich3'}
        ];


// тут залишим окремий компонент з усією логікою по роботі з самим списком
class UsersList extends Component {
    constructor(props) {
        // з App ми сюди передали проп isLight, він сюди сам попадає (можна в рендері через консоль лог перевірити) додатково приймати нічого не треба
        // але тепер цей проп треба передати далі до UsersListItem щоб спрацювало перефарбовування виділеного елемента
        // при кліку на нього в залежності від того чи він обраний і яка тема застосована
      super(props)  // стандартна ініціалізація react компонента

      // до отриманих даних з сервера треба додати ще одну властивість. Дя цього робим точну копію масива
      // і до кожного обєкта в середині додаємо властивість isSelected
      this.state = {
        // берем usersData(масив) мапимо, для кожного елемента(обєкт) повертаємо обєкт id: 1, firstName: 'Test', lastName: 'Testovich' 
        // із новою властивістю isSelected: false, на виході отримаємо новий масив з обєктами юзерів до яких додана нова властивість

        // тобто для кожного u => (неявно поверни обєкт з його рідних властивостей і ще одну властивість isSelected )
        users: usersData.map(u => ({...u, isSelected: false}))
        // Тепер у стейті кожен об'єкт має вигляд: {id: 1, firstName: 'Test', lastName: 'Testovich', isSelected: false}
      }
    }

    // обробник на клік, як параметр отримуємо user.id елемента на якому відбувся клік
    selectUserClickHandler = (id) => {
        const {users} = this.state;  // деструктуруємо поточний масив обєктів із state
        // тут знайди індекс юзера у якого id такий самий як у того по якому клікнули
        const foundIndex = users.findIndex(u => u.id === id); // шукаємо індекс юзера в масиві чий id збігається з тим на який клікнули
        const newUsers = [...users];  // робимо поверхневу копію масива users щоб не мутувати оригінальний state (імутабельність)
        // в копії масиву берем індекс елем(обєкт) на який клікнули і присвоюємо йому нове значення(властивості):
        // обєкт, в якому деструктуруємо той елемент на який клікнули (тобто копіюємо всі його властивості) і замінюємо властивість 
        // isSelected на протилежний до того який мала ця властивість (інвертуємо true/false)
        newUsers[foundIndex] = {
            ...newUsers[foundIndex], 
            isSelected: !newUsers[foundIndex].isSelected
        };

        // після зміни, змінюємо state компонента (підсовуємо в state змінену копію(нова адреса в памяті) вихідного масива і react робить перерендер) 
        this.setState({users: newUsers})
    }

    // функція для малювання одного елемента списку (як параметр передаємо user (кожен елемент масиву в state))
    mapUser = user => {
        // Parent => child (props data) - передаєм дані через пропс
        // Child => Parent (props cb) - передаєм функцію КБ через пропс (так дочірній компонент зможе виикористати батьківську функцію при ствоьренні елемента)

        const {isLight} = this.props;


                                           // Parent => child (props data) // Child => Parent (props cb)
        return <UsersListItem key={user.id} user={user} selectUserClickHandler={this.selectUserClickHandler} isLight={isLight}/>;
    }

    render() {
        // деструктуруємо users з поточного state
        const {users} = this.state;

        // проходимось по поточному масиву users в state
        // замість того щоб в map передати як завжди анонімний колбек, ми створили власну функцію метод mapUser
        // метод map сам по черзі передасть кожного юзера у this.mapUser і поверне готовий масив елементів 
        // [<li key="1">...</li>, <li key="2">...</li>]
        return (
            <ul>{users.map(this.mapUser)}</ul>

        )
    }
}

export default UsersList;
