# warp-drive management software
## Estructura del proyecto
```
.
├── lib
│   └── warp-drive
│       ├── Injector.js
│       ├── Motor.js
│       └── Warp.js
├── README.md
├── run_app_warp.sh
└── spec
    ├── helpers
    ├── support
    │   └── jasmine.json
    └── warp-drive
        ├── InjectorSpec.js
        └── MotoSpec.js

6 directories, 8 files
```
## Ejecutar programa
Se ha desarrollado un script escrito en bash que comprueba las dependencias y ejecuta los test y el programa
completo con los inputs ortorgados.
Para ello se tiene que ejecutar:
```bash
/bin/bash run_app_warp.sh
or
bash run_app_warp.sh
```
### Ejecución Manual
En caso de fallo del script o si se desea realizar pruebas con valores diferentes se puede ejecutar el sigueinte comando,
teniendo en cuenta los parametros enviados.
- El primer parametro son los valores de daño de cada inyector (se puede enviar mas que un injector).
- El segundo parametro es la velocidad de la luz
```bash
/usr/bin/node ./lib/warp-drive/Warp.js "0,0,30" 140
```
### Docker Run

## Dependencias
```
- node == v6.14.4
- npm == 3.10.10
- jasmine == v3.2.0
- jasmine-core == v3.2.1
```

## OS tested
- Debian GNU/Linux 9 (stretch) 64-bit