import React from 'react';

// виносим в окремий компонент всю логіку по роботі з окремим елементом списку
const UsersListItem = (props) => {
    const {
        // це проп який ми проштовхнули від App сюди через Userslistrefactoring
        // щоб реалізувати зміну бекграунду при кліку в колір що залежить від стану в App
        isLight,
        // Child => Parent (props cb) - приймаємо і деструктуруємо пропси (КБ, дані)
        selectUserClickHandler,
        // Parent => child (props data)
        user: {id, firstName, lastName, isSelected}
    } = props;

    const inlineStyle = {
        backgroundColor: isSelected 
            ? isLight 
                ? 'yellow' : 'violet' 
            : 'transparent'
    }; 
    
    return (
        //тут дочірній компонент використовує прийнятий КБ через порпси з батьківського компонента

                                            // Child => Parent (props cb)
        <li style={inlineStyle} onClick={()=>selectUserClickHandler(id)}>  
            {firstName} {lastName}
        </li>
    );
}

export default UsersListItem;

// Способи передачі даних між компонетами:
// Parent => Child (через props data)
// Child => Parent (через props cb)
// Child => Child (через спільний батьківський компонент)

// Підняття стану => Знайти спільного предка!
// Однонаправлений потік даних