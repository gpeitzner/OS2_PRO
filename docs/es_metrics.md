# Despliegue Prometheus y Grafana

Primero se clona el repositorio oficial de Red Hat que contiene todos los archivos necesarios para el despliegue del monitor.

```bash
git clone https://github.com/prometheus-operator/kube-prometheus
```

Entramos al repositorio clonado.

```bash
cd kube-prometheus
```

Creamos todos los objetos necesarios para la instalación.

```bash
kubectl create -f manifests/setup
```

Creamos e instalamos los objetos restantes para el despliegue.

```bash
kubectl create -f manifests/
```

Comprobamos que todos los recursos se hayan desplegado correctamente.

```bash
kubectl get all -n monitoring
```

<img src="images\screen1.png" alt="screen1" style="zoom:50%;" />

Creamos un servicio de tipo balanceador de carga para exponer el deployment de grafana por medio del puerto 80.

```bash
kubectl expose deployment grafana --port=80 --target-port=3000 --name=grafana-service --type=LoadBalancer -n monitoring
```

Obtenemos la IP para poder acceder al dashboard de grafana.

```bash
kubectl get services -n monitoring
```

<img src="images\screen2.png" style="zoom:75%;" />

El usuario para poder acceder al panel de administración de grafana es `admin` y su contraseña es `admin`.

<img src="images\screen3.png" style="zoom:75%;" />

Luego de ingresar al sistema se podrán visualizar gráficas con información de interés acerca del cluster.

<img src="images\screen4.png" alt="screen4" style="zoom:75%;" />

