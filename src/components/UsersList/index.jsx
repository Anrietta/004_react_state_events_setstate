import { Component } from 'react';

// class UsersList extends Component {
//     constructor(props) {
//       super(props)
    
//       // react не вміє виводити обєкти (вони не є валідними реакт чайлдами)
//       // при цьому react вміє виводити масиви!
//       this.state = {
//          users: [1, 2, 3, 4]

//       }
//     }

//     // постий приклад з масивом для розуміння списків і ключів!!!
//     render() {
//         // в масив можна запхнути розмітку!!! і react її гарно виведе
//         // в кожному повторюваному елементі обовязково вказзувати атрибут key який має містти унікальний проп
//         // const elements = [<li key={1}>1</li>, <li key={2}>2</li>, <li key={3}>3</li>];

//         // тепер зробим те саме що в змінній elements але з масива в this.state.users прямо в масив usersElements
//         // якщо у нас масив статичний то в якості key допускається взяти індекс
//         // але якщо масив динамічний, передбачає сортування, додавання, тощо то ні в якому разі індекс не використовуєм як key
//         // а що тоді використовувати для key???
        
//         const usersElements = this.state.users.map((user, index) => <li key={index}>{user}</li>)
//         console.log(usersElements);
//         return (
//             <ul>{usersElements}</ul>
//         );

//     }
// }


//Практичне завдання створити список Юзерів, при кліку на юзера підсвічувати його жовтим, при повторному кліку зняти жовтий
// наче отримуєм дані з сервера:
const usersData = [
            {id: 1, firstName: 'Test', lastName: 'Testovich'},
            {id: 2, firstName: 'Test2', lastName: 'Testovich2'},
            {id: 3, firstName: 'Test3', lastName: 'Testovich3'}
        ];

class UsersList extends Component {
    constructor(props) {
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

    // обробник на клік, як параметр передаємо user.id елемента на якому відбувся клік
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
    mapUser = (user) => {
        // пишемо інлайн стилі (завжди обєкт) з умовним рендерингом:
        // якщо у юзера isSelected true (на нього клікнули) то bcg жовтий, якщо isSelected false то bcg прозорий
        // по замовчуванню всі юзери мають isSelected false, на true він змінюється якщо на елем клікнути 
        const inlineStyle = {backgroundColor: user.isSelected ? 'yellow' : 'transparent'}; 

        // явний return бо ми прописали цю функцію як повноцінну arrow function
        return (
            <li key={user.id} style={inlineStyle} onClick={()=>this.selectUserClickHandler(user.id)}>  
            {/*onClick={()=>this.selectUserClickHandler(user.id)} розписали повністю щоб передати в обробник id usera при кліку
            якби параметр був не потрібен то прописали б так onClick={selectUserClickHandler} */}
                {user.firstName} {user.lastName}
            </li>
        )
    }

    render() {
        // деструктуруємо users з поточного state
        const {users} = this.state;
        // console.log(this.state);

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
