# EditorJS ([Оф. сайт](https://editorjs.io/ "Оф. сайт"))
Готовый редактор к использованию в проектах.

## Установка и публикация пакета
-  Установите зависимости: `yarn` или `npm install`
-  Перед публикацией пакета необходимо его собрать: `yarn build` или `npm run build`
-  Публикация пакета выполняется с помощью команды `np`

## Разработка
-  Кастомные плагины находятся в директории: `src/js/CustomPlugins`
-  Обертка для редактора: `src/ContentEditor.js`
-  Точка входа (для Webpack): `src/index.js`
-  Стили для редактора: `src/styles`

## Используемые плагины от разработчика
-  Заголовки (**Header**) - [документация](https://github.com/editor-js/header "документация")
-  Списки (**List**) - [документация](https://github.com/editor-js/list "документация")
-  Изображения (**ImageTool**) - [документация](https://github.com/editor-js/image "документация")
-  Вставка ссылок (**Embed**) - [документация](https://github.com/editor-js/embed "документация")

## Кастомные плагины
- Маркер (**Marker**) - задает фоновый цвет тексту
- Цвет (**Color**) -  задает цвет тексту
- Нижнее подчеркивание (**Underline**) - задает внизу текста линию
- Перечеркнутый текст (**Delete**) - задает посередине текста линию
- Выбор размера шрифта (**FontSize**) - задает выбранный размер шрифта тексту

### Конфигурация кастомных плагинов
В **плагины** - *Marker*, *Color*, *FontSize* мы можем **передать** *применяемые классы* к текстовым - нодам. Это делается с помощью свойства **Config** при подключении расширения.

Передается массив, например, для плагина **Color** будет:` ['cdx-color_view_defaul', 'cdx-color_view_danger', 'cdx-color_view_success']`. 

#### Конфигурация Marker и Colors
Для *Marker* и *Color* - свойство с именем **colors**. 


#### Конфигурация для FontSize
Для *FontSize* - свойтсво с имененм **sizes**.

**Пример** полного кода:
```javascript
color: {
	class: Color,
	shortcut: 'CMD+SHIFT+C',
	config: {
		colors: ['cdx-color_view_defaul', 'cdx-color_view_danger', 'cdx-color_view_success']
	}
}
```
## Инициализация плагина
Подключите из папки dist файлы **js** и **css**: *editor.js* и *editor.css*
Класс - обертка будет доступна в объекте **window**: *window.editorJS*

Пример инициализации:
```javascript
if (window.editorJS !== undefined) {
	var editor = new window.editorJS();
}
```


