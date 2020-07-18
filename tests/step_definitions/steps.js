const {I} = inject();

Given('я залогинен как администратор:', table => {
    I.amOnPage('/login');
    const tableData = table.parse().rawData;
    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    });
    I.click("#login");
});

When('нахожусь на странице добавления заведения', () => {
    I.amOnPage('/new_place');
});

When('нахожусь на главной страинце', () => {
    I.amOnPage('/');
});

When('нахожусь на страинце логина', () => {
    I.amOnPage('/register');
});

When('я на странице регистрации', () => {
    I.amOnPage('/register');
});

When('я заполняю поля формы добавления:', table => {
    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        I.fillField(row[0], row[1]);
    });
});

When('я нажму на кнопку', () => {
    I.click('#check');
});

When('я добавляю заведение', () => {
    I.click('#add_place');
});

When('нажимаю на кнопку', () => {
    I.click('#name');
});

When('я зарегистрируюсь', () => {
    I.click('#register');
});