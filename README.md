# TALLER 2(PROGRAMACION)

Frontend SPA del supermercado MarketSoft desarrollado con React.

realizado por:SANTIAGO TORO AMARILES 

PARA: UNIVERCIDAD DE MANIZALES 


## Tecnologias

- React
- React Router DOM
- Axios
- Bootstrap
- Bootstrap Icons
- Vite

## Módulos

- Productos: listar, crear, editar y eliminar.
- Usuarios: listar, crear, editar y eliminar. (La verdad tuve varios problemas con este modulo ya que lagunas veces funciona y otras no algo me dice que es una falta de copatibilidad con el el backend del taller 1 debe ser que en uno dice user y en otro users pero aun asi no puede encontrar el error)
- Proveedores: listar, crear, editar y eliminar.
- Ventas: listar, crear, editar y eliminar.

## Arquitectura

esta separa separa:

- `components/`: componentes reutilizables de interfaz.
- `pages/`: páginas y formularios de cada módulo.
- `services/`: consumo centralizado de la API mediante Axios.
- `App.jsx`: rutas de la SPA.
- `index.css`: estilos adicionales.

## Requisitos

- El primer requisito es tener node istalado.
- El segundo es tener mi backend del primer taller ejecutandose aparte por ejemplo yo estube ejecutando mi codigo de frondend en visual y a la vez estube ejecutando y configurando el backend en Powershell ademas de encende primero el pgadmin o el xam donde esta la base de datos.
- API disponible en `http://localhost:3000/api` o modificar `.env`.

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start 
npm run dev
```

La aplicación quedará disponible en(esta funcionara siempre y cuando el backend y pgadmin esten ejecutandose de lo contrario dara diveros errores):

`http://localhost:5173`


## API

El frontend tiene los siguientes recursos:

- `GET/POST/PUT/DELETE /api/products`
- `GET/POST/PUT/DELETE /api/users` (como informe anteriormente puede que este no funcione en total normalidad o directamente no funciones gracias por entender ademas agradeceria en el comentario del taller saber que hice mal para que no funcionara GRACIAS:)
- `GET/POST/PUT/DELETE /api/providers`
- `GET/POST/PUT/DELETE /api/sales`
- `GET/POST/PUT/DELETE /api/sale-details`

## Importante

Este proyecto como principal contratiempo tuve fue echo de la conectividad con el el backend por difersas situciones como el PRIMARY KEY en pg o valores que no cincidian y claro como el back end tiene seguridad inmediatamente rebota el error

## CONCLUCION
Durante el desarrollo de este segundo taller me ha permitido en lo personal aquirir nuevos conocimientos ademas me parecio muy dinamico el cruce entre backend frodend, pg etc ya que pese a que tenia algunos conocimientos previos pude aprender muchas cosas nuevas y anque este me presento retos debido a la integracion de sistemas por ultimo quiero agregar mis agradecientos por el timpo prestado ya que este el el valor mas preciado