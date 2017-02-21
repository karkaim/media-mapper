# mediamap

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.  <- usar grunt serve mientras se desarrolla.


una vez hechos los cambios. usar `grunt` o `grunt build` para compilar. terminada la compilación:

ir a la carpeta dist
`cd dist`

ejecutar:

for i in $(find scripts -type f); do                                                                                   :)
EXT=`echo $i | awk -F. '{print $2}'`                                                                                      sed -i "s/$EXT.//g" *.html
done

for i in $(find styles -type f); do                                                                                    :)
EXT=`echo $i | awk -F. '{print $2}'`                                                                                      sed -i "s/$EXT.//g" *.html
done

mv scripts/vendor* scripts/vendor.js; mv scripts/scripts*js scripts/scripts.js && mv styles/main* styles/main.css && mv styles/vendor.*css styles/vendor.css

pasar los archivos a la carpeta del ftp que por ahí anda.
TODO: terminar este documento con la ruta y datos del ftp. el index.html no se usa. es uno que anda harcodeado por ahí.


EL BACKEND NO ES MANTENIBLE