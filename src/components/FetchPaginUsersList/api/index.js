// імпортую бібліотеку nmp query-string для динабічного формування рядка запиту URL
import queryString from 'query-string';

// імпортую параметри налаштувань (дефолт) для формування рядка запиту URL
import CONFIGS from './../configs' 

// створимо окрему функцію яка буде звертатись до сервера щоб отримати список юзерів (чистий код)

// сама папка api це місце збору таких функцій яка будуть виходити назовні (в мережу, сервер, бази даних),
// її краще розташовувати в папці src на одному рівні з components, щоб всі окремі речі зберігались в окремих місцях
// в components зберігаються всі компоненти, в api - всі файли для роботи з api
// тут я залишу цю папку в папці цього компонента щоб все що його стосується було в одному місці для наглядності

// ф-я приймає обєкт параметрів, де 
// page - це currentPage з основного компонета
// results - кількість обєктів юзерів які ми хочемо завантажити за 1 раз (параметри самого посилання)
// seed - завантажувати тих самих юзерів а не рандомних (параметри самого посилання)
// inc (include)- які саме властивості з обєкта юзера нам потрібні, не всі а конкретні (параметри самого посилання)


// функція повертає проміс із розпарсеними даними які ми перехопимо в методі loadUsers головного компонента для подальшої обробки
function getUsers(options) {

    // передавати постійно купу опцій геморно, можна залишити ті які змінюються а інші зробити дефолтними
    // для цього створимо змінну в якій задамо значення всім потрібним параметрам
    // const defaultOptions = {
    //     page: 1,
    //     results: 7,
    //     seed: 'pe2022',
    //     inc: ['name', 'gender', 'email', 'login'],
    // }

    //  використ імпортовані конфіги в дефолтних опціях
    const defaultOptions = {
        page: 1,
        results: CONFIGS.RESULTS_COUNT,
        seed: CONFIGS.RESULTS_ORDER,
        inc: CONFIGS.INCLUDING_RESULTS,
    }
    // памятаємо що мутація даних це погано, тому робимо поверхову копію дефолтних значень і доліплюємо ті що 
    // можуть бути передані з головного компонента. Тепер якщо опції не передані то застосуються лише дефолтні
    // а ті властивості що передані в опції перезапишуть попередні і застосуються до fetch

    const realOptions = {
        ...defaultOptions,
        ...options,
    }


    // const {page, results, seed, inc} = realOptions;


    // є окрема бібіліотечка яка вміє формувати параметри рядка запиту(адресний рядок) прямо з обєкта (query-string - npm)
    // поколупатись і переробити на бібліотечку
    // return fetch(
    //     `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}&inc=${inc}`
    // ).then(response => response.json());

    // query-string - бібліотечка яка дозволяє розбирати/збирати рядки запиту URL (напр. з прямо з обєкта створити 
    // рядок запиту URL - посиланнячко звідки ми отримуєм дані про юзерів)
    // Переробим класичний fetch з використанням змінних (для динамічного завантаження) на fetch з query-string
    
    // створюю змінну яка містить розпарсені опції з realoptions і додатковий параметр який означає що якщо серед опцій є 
    // масив то хай зєднає його елементи в один рядок через кому
    // далі Метод stringify збирає всі ключі, з'єднує їх символом & і повертає готовий рядок, який записується в константу queryStringifiedOptions
    const queryStringifiedOptions = queryString.stringify(realOptions, {
        arrayFormat: 'comma',
    });

    // тут ми склеюємо посилання на URL + сформований рядок запиту за параметрами з обєкта опцій і повертаємо проміс який 
    // перехопить функція loadUsers в головному компоненті
    return fetch(`${CONFIGS.BASE_URL}?${queryStringifiedOptions}`). then (
        response => response.json()
    );
}

export default getUsers;




// Супер-бонус: Нативний спосіб без npm (URLSearchParams)
// Ти згадувала в коментарях про бібліотеку query-string. 
// Зараз у сучасних браузерах (і Node.js) вже є вбудований клас URLSearchParams, який робить це без встановлення додаткових бібліотек:

// JavaScript
// function getUsers(options) {
//     const defaultOptions = {
//         page: 1,
//         results: 7,
//         seed: 'pe2022',
//         inc: ['name', 'gender', 'email', 'login'],
//     };

//     const realOptions = { ...defaultOptions, ...options };

//     // Створюємо URLSearchParams, який сам сформує правильний query-рядок
//     const params = new URLSearchParams({
//         page: realOptions.page,
//         results: realOptions.results,
//         seed: realOptions.seed,
//         inc: Array.isArray(realOptions.inc) ? realOptions.inc.join(',') : realOptions.inc,
//     });

//     return fetch(`https://randomuser.me/api/?${params.toString()}`)
//         .then(response => response.json());
// }