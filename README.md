# cms

Backend de mediamapper

## Usage

Necesita [leiningen](https://leiningen.org/) instalado para compilar,  una vez instalado:

descargar las dependencias:

```
lein deps
```

compilar crear el jar, este viene automaticamente con un servidor jetty. El jar se encuentra en el folder target/, el que dice snapshot tiene todas las dependencias incluidas

```
lein ring uberjar
```

Una vez creado el jar, se debe poner en la ruta emmediam@emmediamapper.com:/opt/emmediamap/cms.clj (el usuario tiene permisos de escritura, no es necesario  usar root)

Por ultimo, reiniciar el servicio con

```
sudo service emmediamapper restart
```


## Configuracion


* El puerto en el que jetty carga el servidor se encuentra en el archivo project.clj
* Las rutas del servidor se encuentran en src/cms/handler.clj junto con la configuracion de autenticacion (usa la librería friend)
* La conección con la base de datos se encuentra en src/cms/db.clj
* Las funciones para trabajar con las imágenes y pdfs se encuentran en images.clj y pdf.clj respectivamente


## License

Copyright © 2015 FIXME

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
