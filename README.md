# Должно быть установлено

node.js - https://nodejs.org/ + npm

git - https://github.com/bower/bower#windows-users

bower

```bash
npm install -g bower
```

gulp

```bash
npm install -g gulp
```

# Как и где работаем
* рабочая директория: /src/
* результат development: /build/
* результат production: /local/templates/project_name/build/ или /bitrix/templates/project_name/build/ (пути для Bitrix)
* readme: /README.md

В проекте сборка фронтенда реализована с помощью gulp.
Пакетный менеджер bower. По возможности все ставим через него.

# Настройка окружения

```bash
bower i
```

```bash
npm i
```

```bash
gulp
```

Запустится сервер http://localhost:3000

## Сборка

Настроено 2 сборки, development и production.
 
**development** - дефолтная, запускается при выполнении команды gulp, при этом запускается сервер http://localhost:3000. Собирается в /build/.

**production** - запускается при выполнении команды gulp --env=prod. Собирается в /local/templates/project_name/build/ или /bitrix/templates/project_name/build/ (пути для Bitrix), этот путь можно поменять в /gulp/config.js.
Так же в production есть минификация стилей и js.

### Как работаем

**!!** Ни чего не меняем руками в папке build.

Если нужно внести какие-то изменения в верстку, то вся работа ведется в /src/ с development сборкой и проверкой на http://localhost:3000.
После этого запускаем production сборку и радуемся.
html естественно придется переносить руками т.к. в production он не собирается.

Если нужно добавить какой-то новый js без сборки, то это можно сделать, например в /bitrix/templates/template_name/js/ или в самом компоненте в script.js.

Также **можно запускать отдельно нужные таски сборки**, например:
```bash
gulp postcss
```
или
```bash
gulp postcss --env=prod
```

**Список всех тасков** (все таски, кроме html, watch и webserver, доступны с параметром --env=prod):

* gulp (запускает сервер со статикой http://localhost:3000, делает полную сборку и запускает watch)
* gulp build (делает полную сборку)
* gulp clean (удаляет содержимое папки build)
* gulp watch (мониторит все изменения и запускает нужные таски)
* gulp postcss
* gulp postcss-internal
* gulp postcss-external
* gulp js
* gulp js-internal
* gulp js-external
* gulp images
* gulp fonts
* gulp html

Вся работа (до и после интеграции) ведется в /src/

# Что есть

**lost** - сетка c обычными колонками, флексами и вафлями см. https://github.com/peterramsing/lost

**short** - сокращения см.
https://github.com/jonathantneal/postcss-position
https://github.com/jonathantneal/postcss-center
https://github.com/jonathantneal/postcss-size

**px to rem** - автоматически заменяет пиксели на rem в размерах шрифтов

**precss** - включает поддержку возможностей SASS

**sassy-mixins** - позволяет использовать миксины как написанные на sass, так и postcss

**postcss-next** - позволяет использовать CSS4 http://cssnext.io/features/

**postcss-easysprites** - делает спрайт из картинок см. https://github.com/glebmachine/postcss-easysprites

использование в css (#sprite - имя спрайта):

```
background-image: url('../img/sprite/search.png#sprite');
```

**postcss-svg** - позволяет вставлять инлайн svg в css, к сожалению без возможности использовать transition см. https://github.com/Pavliko/postcss-svg

использование в css:

```
background-image: svg('search', '[fill]: #000');
```

**animate.css** - классы для разнообразных анимаций https://github.com/daneden/animate.css/

**gulp-file-include** - используется для "шаблонизации", позволяет импортировать один файл в другой с передачей каких-либо параметров см. https://www.npmjs.com/package/gulp-file-include

**browsersync** - вебсервер.