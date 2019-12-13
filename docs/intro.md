# Punto de venta (PV)
### Inicio Rapido
1. Asegurarse de tener minimo Node.js v8.15.1 y npm v5 instalados.
2. Clonas los repositorios:
2.1 https://github.com/ralphmarks/PS
2.2 https://github.com/ralphmarks/PS_API
3. Para ejecutar el API 
    ```shell
    cd PS_API
    npm install 
    npm start
    ```
4. Para ejecutar el Punto de venta
    ```shell
    cd PS
    yarn install 
    yarn start
    ```
5. En este punto el API debe estar ejecutandose en http://localhost:3030 y el punto de venta en http://localhost:3000.

### Tabla de contenido
* Introduccion 
* Overview
* Agregar nueva funcionalidad

---
---
---
### Introduccion 
## Tech Stack
* React
* React Router
* Redux
* Redux Saga
* Reselect
* Immer
* Styled Components
## Estructura del proyecto
### src/
Contiene el codigo de la aplicacion de React, se uso la arquitectura contenedor/componente.
#### src/containers
Los contenedores son componentes de React que estan conectados a un estado global (redux store).
#### src/components
Contiene componentes de react que son 'dumb coponents', esto quiere decir que dependen de los contenedores para recibir los datos que necesitan.

Contenedores se encargan de manejar como funcionan las cosas, componentes manejan como se ven las cosas.

Una practica comun es tratar cada pagina de la aplicacion como un contenedor y las partes pequeñas que lo componen como componentes.

## Como inicia la aplicacion? 
Como cualquier otra pagina web, inicia en public/index.html React se encarga de mostrar la aplicacion dentro de div#root. Webpack se encarga de transpilar el codigo en varios archivos de javascript que son inyectados en index.html como <script> tags.

Cuando la aplicacion es pubicada en un servidor, los navegadores cargan el archivo index.html, los archivos que webpack incluyo son ejecutados por el navegador, lo que inica la aplicacion de react.

## src/index.js:
Al ejecutar yarn start, un servidor de desarrollo empezará a correr, se puede acceder abriendo http://localhost:3000 en el navegador.

src/index.js contiene configuracion global:
* Un objeto history es creado, este recuerda todo el historial de navegacion de la aplicacion. Es utilizado por el ConnectedRouter para saver que paginas a visitado el usuario 
* Una redux store es inicializada.
* ReactDOM.render() enderea el componente raiz llamado <App />, esto lo hace en conjunto con un <Provider /> y un <ConnectedRouter />.
* <Provider /> conecta la aplicacion con la redux store.
## Redux
La configuracion de la redux store se encuentra en configureStore.js
La store es creada con createStore(), que acepta en este caso 3 parametros, en este caso [reducer raiz, estado inicial, middleware].
Reducer raiz: Es un reducer que combina todos los demas reducers.
Estado inicial: El estado inicial de la aplicacion esta determinado por los reducers.
Middleware: Librerias que interceptan cada accion que es despachada a la redux store y le aplica cambios.
Por ahora se estan usando 2 middlewares:
Router middleware: Mantiene las rutas sincronizadas con la redux store.
Redux saga: Se utiliza para controlas side-effects, tales como acciones asincronas o acceder a los datos del navegador.
## Reselect
Reselect es una libreria para obtener solo partes de la redux store.
Tiene distintas caracteristicas:
Teniendo una lista de usuarios, reselect permite crear una funcion que regrese solo ciertos elementos dependiendo de una condicion, esto beneficia el desempeño ya que no se crea otra lista para guardar los usuarios filtrados.
Memoization: Un selectos no calculara un nuevo resultado a menos que sus argumentos cambien, reselect primero compara los argumentos nuevos y viejos, para despues decidir si debe calcular nu nuevo resultado.
Composability: Se pueden combinar multiples selectores, un selector puede filtrar nombres otro por edad y se pueden combinar utilizando la funcion createSelector()
## Redux Saga
Un saga es como un hilo separado de la aplicacion, que solo es responsable de los efectos secundarios, redux-saga es un middleware, lo que significa que puede ser iniciado, pausado y cancelado desde la aplicacion principal con redux actions, tiene acceso al estado completo de la aplicacion y puede despachar acciones.

---
---
---
## Agregar nueva funcionalidad 
Primeramente se va a crear un nuevo contenedor, para esto hay que crear una nueva carpeta dentro de /containers
CARPETA DemoPage
Dentro de esta carpeta hay que crear 6 archivos:
* actions.js
* constants.js
* index.js
* Loadable.js
* reducer.js
* selectors.js

En index.js se encuentra el codigo del contenedor:
```javascript
import React, { memo } from 'react'
import Navbar from '../../components/Navbar'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { } from './actions';
import { } from './selectors';
import reducer from './reducer';
const key = 'demo';
const DemoPage = () => { 
    return (
    <div><h1>Demo</h1></div>
    )}
DemoPage.propTypes = {
};
const mapStateToProps = createStructuredSelector({
});
export function mapDispatchToProps(dispatch) {
  return {};
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(DemoPage);
```
Una vez agregado el contenido al archivo index.js, se tiene que agregar a una ruta, en este se agregan las siguientes lineas al archivo /App/index.js:
```javascript
...
import DemoPage from './../DemoPage'
...
<Route exact path="/demo" component={DemoPage} />
...
```
Una vez agregadas las 2 lineas, se debe poder ver el componente en la direccion http://localhost:3000/demo.
Para mostrar informacion hay que crear un reducer, el cual se encarga de permitirle al componente acceder al estado y a actualizarlo.
El reducer se encuentra en reducer.js
```javascript
import produce from 'immer';

export const initialState = {
  number: 0,
};

/* eslint-disable default-case, no-param-reassign */
const DemoReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      default:
        break
    }
  });

export default DemoReducer;
```
Para usar el reducer en el componente hay que agregar las siguientes lineas en index.js: 
```javascript
...
import reducer from './reducer';
import { useInjectReducer } from './../../utils/injectReducer'
...
...
useInjectReducer({ key, reducer });
...
```
Ahora ya se puede obtener el valor de numero del estado, utilizando los selectores, se agrega el siguiente codigo en selectors.js
```javascript
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDemo = state => state.demo || initialState;

const makeSelectNumber = () =>
  createSelector(
    selectDemo,
    empState => empState.number,
  );

export { makeSelectNumber };
```
Esto permite que en el archivo index.js se pueda importar esta funcion para crear el selector de la variable number 
```javascript
...
import { makeSelectNumber } from './selectors'
...
const mapStateToProps = createStructuredSelector({
  number: makeSelectNumber(),
});
```
con esto, number ya esta disponible, ahora solo falta incluirla como prop en el contenedor de la siguiente manera
```javascript
const DemoPage = ({number}) => {
```
y de ahora en adelante, number esta disponible para ser desplegado 
```javascript
<h1>Demo {number}</h1>
```
Los usuarios pueden cambiar el estado, en este ejemplo se va a agregar un boton para el cambio, lo primero es crear una constante para la accion de aumentar el numero. Eso se agrega en constants.js
```javascript
export const ADD_TO_NUMBER = 'ps/Demo/ADD_TO_NUMBER'
```
La nomenclatura es: nombre_de_la_aplicacion/nombre_container/accion 
Ya que la constante fue creada, se puede crear la accion, esta se agrega en el archivo actions.js
```javascript
import { ADD_TO_NUMBER } from './constants'
/**
 * Adds n to number
 * @param  {int} n Valor para agregar a number
 * @return {object} An action object with a type of ADD_TO_NUMBER
 */
export function addToNumber(n) {
  return {
    type: ADD_TO_NUMBER,
    value_to_add: n,
  };
}
```
Los comentarios generan la descripcion de la funcion. Ahora se puede importar en el index.js
```javascript
...
import { addToNumber } from './actions';
...
export function mapDispatchToProps(dispatch) {
  return {
    onAddToNumber: (n) => dispatch(addToNumber(n)),
  };
}
...
```
Al igual que se hizo con la variable number, se tiene que pasar la funcion como prop:
```javascript
const DemoPage = ({number, onAddToNumber}) => {
```
y ahora se puede agregar a elementos como un boton:
```html
<div 
onClick={() => onAddToNumber(Math.random() * 10)}
className="btn">Agregar Numero
</div>
```
Ahora cuando se haga click en el boton, la accion va a llegar al reducer, ahora se tiene que agregar el cambio del estado, en reducer.js
```javascript
...
import { ADD_TO_NUMBER } from './constants'
...
...
 switch (action.type) {
    ...
    case ADD_TO_NUMBER:
        draft.number = draft.number + action.value_to_add
        break
    ...
}
...
```