epam test task - Gleb Voronin
===================
####**Set of tools and technologies** 
> - Gulp task runner + Node.js web server.
> - SASS (SCSS Syntax) css preprocessor. 
> - JS + HTML + CSS

####**Project structure** 

> - Project contains Build and Src folders.
> - src/
>  - scss
>  - fonts
>  - js 
>  - img
>  - templates
> - build
>  - css
>  - fonts
>  - js
>  - img
>  - index.html

Project developed as single page application. default ***gulp*** task runs project build from src and starts node.js server.

####**JS implementation** 
Js part implemented as object methods with initialization on page load.
all the JS code can be found in src/js/main.js
Data from API loading using async XMLHttpRequest.
####**HTML part** 
Page itself made using float elements. 
news grid is made using flex elements, articles are rendered using JS.
Popups are pure HTML + CSS with JS visibility toggle.