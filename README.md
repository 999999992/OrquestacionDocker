# Orquestacion con Docker

Conexion a la Base de Datos: Una aplicacion Node.JS que usa la libreria mysql2 para obtener los parametros de la
conexión a traves de variables de entorno que son inyectadas por Docker Compose

Dependencia y Health Check: El servicio espera a que el servicio mysqldb este completamente operativo, esto gracias
al healthcheck y la configuracion (depends_on) en docker-compose.yml.

El Estado de la Base de Datos: La ruta (/db-status) comprueba activamente la capacidad de la aplicacion para obtener
una conexion del pool de la base de datos, informando OK si es exitosa o ERROR si llega a fallar.

Acceso Externo: Se refiere a que la aplicacion se accede desde tu maquina a traves del puerto 3000 (3000:3000)
La base de datos MySQL se accede externamente a traves del puerto 3307 de tu maquina, la cual mapea al puerto interno 3306
del contenedor (3307:3306)

------------------------------------------------------------------------------------------------------------------------

Se define la arquitectura especifica de dos servicios interdependientes en un solo archivo.
Lo mas crucial es la Gestion de Dependencias y Tiempos con la condicion service_health y el uso de depends_on, esto garantiza que el contenedor de la aplicacion de Node.JS no intente conectarse a la base de datos hacia que el propio MySQL haya confirmado que esta listo y pueda ejecutar consultas.

Docker Compose crea automaticamente una red visual que permita a los servicios comunicarse usando sus nombres de servicio, conectandose a mysqldb usando DB_HOST: mysqldb.

Tambien una configuracion centralizada para todas las configuraciones que estan centralizadas en el docker-compose.yml.
- Puertos
- Variables de Entorno y volumenes.

. Utilice Docker Desktop para la gestion y visualizacion de estos contenedores y DBeaver para interactuar con el contenedor de la base de datos son practicas comunes que complementan este modelo de orquestación.


el .docker.ignore es un archivo que se coloca en la raiz del proyecto para excluir archivos o directorios en este caso puede incluir un archivo de dependencias como por ejemplo node_modules o patrones de exclusion, etc.

(si es opcional con npm install tendras la carpeta de node_modules en el proyecto.)


