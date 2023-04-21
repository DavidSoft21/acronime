Este proyecto se compone de dos partes

backend: 

desarrollado con express 
lugar donde se encontrara el archivo routes
encargado de gestionar y proporcionar los
datos de consulta como de insercion

frontend:

desarrollado en angular 2 con la capa de diseño de 
angular material, lugar desde donde generamos las peticiones
a nuestro server para renderizar los datos de busquedad de un
acronimo x en nuestras tabla

pasos para ejecutar  

en mysql crear tabla acronime_db

luego importar las tablas que se encuentran dentro de la
carpeta file

instale las dependencias desde la carpeta raiz de nuestro proyecto

tanto de backend como de frontend ejecutar el siguiente comando:

npm i

posterior mente en el backend 

ejecutamos npm run dev

de esta manera tendremos conectado el servidor a nuestro motor de bases de datos

y por ultimo en nuestro frontend ejecutar 

ng serve nos dirijimos a la siguiente ruta: http://localhost:4200
