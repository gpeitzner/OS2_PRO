# MANUAL DE USUARIO

## EZGAMES
EZ Games es un catalogo de juegos en linea que es capaz de manejar usuarios, para que cada usuario pueda registrar sus descargas en su perfil.

### Inicio de sesión

![ezgames](https://user-images.githubusercontent.com/30853287/103238907-b97a3e00-4911-11eb-9dcb-0373138e3840.jpeg)

Para registrarte en el portal solo es necesario brindar un email y contraseña.

### Catalogo de juegos

![ezgames catalogo](https://user-images.githubusercontent.com/30853287/103238909-bb440180-4911-11eb-9d0d-45540156d393.jpeg)


El catalogo de juegos muestra todos los juegos que estan disponibles para su descarga en ezgames, una vez registrado basta con presionar la tecla de descarga "download" para agregar el juego a su catalogo.


## PROMETHEUS
Prometheus es una aplicación de software gratuita que se utiliza para la supervisión y alerta de eventos. Registra métricas en tiempo real en una base de datos de series de tiempo (que permite una alta dimensionalidad) construida usando un modelo de extracción HTTP, con consultas flexibles y alertas en tiempo real. El proyecto está escrito en Go y tiene licencia de Apache 2 License, con código fuente disponible en GitHub, y es un proyecto graduado de Cloud Native Computing Foundation, junto con Kubernetes y Envoy.

## GRAFANA

Grafana es un software libre basado en licencia de Apache 2.0, que permite la visualización y el formato de datos métricos. Permite crear cuadros de mando y gráficos a partir de múltiples fuentes, incluidas bases de datos de series de tiempo como Graphite, InfluxDB y OpenTSDB

![grafana1](https://user-images.githubusercontent.com/30853287/103239843-5c33bc00-4914-11eb-88d6-e44877006db7.jpeg)
![grafana2](https://user-images.githubusercontent.com/30853287/103239840-5b028f00-4914-11eb-947d-ee3babbfdadd.jpeg)
![grafana3](https://user-images.githubusercontent.com/30853287/103239845-5d64e900-4914-11eb-8d7f-08e03d0d60b9.jpeg)
![grafana4](https://user-images.githubusercontent.com/30853287/103239844-5ccc5280-4914-11eb-83a7-a58a4c8d53fd.jpeg)

## ¿Como se utiiliza?

Para  poder visualizar de una mejor manera el funcionamiento del CPU utilizaremos el programa Stress, el cual es una herramienta de Linux la cual nos permite, mediante líneas de comando, llevar al límite el poder de nuestros servidores. Para apreciar mejor el funcionamiento de nuestro servidor, debemos de configurar Grafana para que se actualice periódicamente y actualice los datos, ejemplos del uso de Stress

    stress --cpu 2 --io 1 --vm 2 --vm-bytes 1024M -t 20s
    stress --cpu 1 --io 1 --vm 1 --vm-bytes 10M -t 20s
