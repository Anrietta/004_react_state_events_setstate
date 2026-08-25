const ThemeBtn = props => {
    // Приймаємо пропси де isLight це дані, changeTheme це КБ мктод зі зміни стилю кнопки
  const { isLight, changeTheme } = props;

  const inlineStyle = {
    color: isLight ? 'black' : 'white',
    backgroundColor: isLight ? 'white' : 'black',
  };

  // При кліку на кнопку ми змінюємо стан в компонеті App (який є батьківським)
  return (
    <button onClick={changeTheme} style={inlineStyle}>
      {isLight ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeBtn
