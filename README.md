# freelancing-platform-project

Парамонов М.С.
end-points модели Member

регистрация нового пользователя (доступно любому пользователю)  
/api/v1/users/reg_in/  
POST  
JSON схема передаваемых данных
~~~
{
    "first_name": "Имя",
    "last_name": "Фамилия",
    "email": "адрес электронной почты в принятом стандарте",
    "password": "пароль",
    "re_password": "ещё раз пароль",
    "is_customer": пользователь регистрируется в качестве заказчика (булева переменная),
    "is_worker": пользователь регистрируется в качестве фрилансера (булева переменная)
}
~~~
Все поля обязательны к заполнению, булевы не могут быть оба True или False

вход зарегистрированного пользователя на сайт (доступно любому пользователю)  
/api/v1/login/jwt/create/  
POST  
JSON схема передаваемых данных
~~~
{
    "email": "адрес электронной почты в принятом стандарте",
    "password": "пароль"
}
~~~

смена адреса электронной почты (авторизация с использования JWT-токена)  
/api/v1/users/new_email/  
POST  
JSON схема передаваемых данных
~~~
{
    "new_email": "новый email",
    "re_new_email": "ещё раз новый email",
    "current_password": "действующий пароль пользователя"
}
~~~

смена пароля (авторизация с использования JWT-токена)  
/api/v1/users/new_password/  
POST  
JSON схема передаваемых данных
~~~
{
    "new_password": "новый пароль",
    "re_new_password": "ещё раз новый пароль",
    "current_password": "действующий пароль пользователя"
}
~~~
