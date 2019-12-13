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

Como cualquier otra pagina web, inicia en public/index.html React se encarga de mostrar la aplicacion dentro de div#root. Webpack se encarga de transpilar el codigo en varios archivos de javascript que son inyectados en index.html como <script>  tags.

  

Cuando la aplicacion es pubicada en un servidor, los navegadores cargan el archivo index.html, los archivos que webpack incluyo son ejecutados por el navegador, lo que inica la aplicacion de react.

  

## src/index.js:

Al ejecutar yarn start, un servidor de desarrollo empezará a correr, se puede acceder abriendo http://localhost:3000 en el navegador.

  

src/index.js contiene configuracion global:

* Un objeto history es creado, este recuerda todo el historial de navegacion de la aplicacion. Es utilizado por el ConnectedRouter para saver que paginas a visitado el usuario

* Una redux store es inicializada.

* ReactDOM.render() enderea el componente raiz llamado <App />, esto lo hace en conjunto con un <Provider /> y un <ConnectedRouter />.

*  <Provider /> conecta la aplicacion con la redux store.

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

Tiene distintas características:

Teniendo una lista de usuarios, reselect permite crear una funcion que regrese solo ciertos elementos dependiendo de una condición, esto beneficia el desempeño ya que no se crea otra lista para guardar los usuarios filtrados.

Memoization: Un selectos no calculara un nuevo resultado a menos que sus argumentos cambien, reselect primero compara los argumentos nuevos y viejos, para después decidir si debe calcular nu nuevo resultado.

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

import  React, { memo } from  'react'

import  Navbar  from  '../../components/Navbar'

import  PropTypes  from  'prop-types';

import { createStructuredSelector } from  'reselect';

import { connect } from  'react-redux';

import { compose } from  'redux';

import { } from  './actions';

import { } from  './selectors';

import  reducer  from  './reducer';

const  key  =  'demo';

const  DemoPage  =  ()  => {

return (

<div><h1>Demo</h1></div>

)}

DemoPage.propTypes  = {

};

const  mapStateToProps  =  createStructuredSelector({

});

export  function  mapDispatchToProps(dispatch) {

return {};

}

const  withConnect  =  connect(

mapStateToProps,

mapDispatchToProps,

);

export  default  compose(

withConnect,

memo,

)(DemoPage);

```

Una vez agregado el contenido al archivo index.js, se tiene que agregar a una ruta, en este se agregan las siguientes lineas al archivo /App/index.js:

```javascript

...

import  DemoPage  from  './../DemoPage'

...

<Route exact path="/demo" component={DemoPage}  />

...

```

Una vez agregadas las 2 lineas, se debe poder ver el componente en la direccion http://localhost:3000/demo.

Para mostrar informacion hay que crear un reducer, el cual se encarga de permitirle al componente acceder al estado y a actualizarlo.

El reducer se encuentra en reducer.js

```javascript

import  produce  from  'immer';

  

export  const  initialState  = {

number:  0,

};

  

/* eslint-disable default-case, no-param-reassign */

const  DemoReducer  =  (state  =  initialState,  action)  =>

produce(state,  draft  => {

switch (action.type) {

default:

break

}

});

  

export  default  DemoReducer;

```

Para usar el reducer en el componente hay que agregar las siguientes lineas en index.js:

```javascript

...

import  reducer  from  './reducer';

import { useInjectReducer } from  './../../utils/injectReducer'

...

...

useInjectReducer({ key,  reducer });

...

```

Ahora ya se puede obtener el valor de numero del estado, utilizando los selectores, se agrega el siguiente codigo en selectors.js

```javascript

import { createSelector } from  'reselect';

import { initialState } from  './reducer';

  

const  selectDemo  =  state  =>  state.demo  ||  initialState;

  

const  makeSelectNumber  =  ()  =>

createSelector(

selectDemo,

empState  =>  empState.number,

);

  

export { makeSelectNumber };

```

Esto permite que en el archivo index.js se pueda importar esta funcion para crear el selector de la variable number

```javascript

...

import { makeSelectNumber } from  './selectors'

...

const  mapStateToProps  =  createStructuredSelector({

number:  makeSelectNumber(),

});

```

con esto, number ya esta disponible, ahora solo falta incluirla como prop en el contenedor de la siguiente manera

```javascript

const  DemoPage  =  ({number})  => {

```

y de ahora en adelante, number esta disponible para ser desplegado

```javascript

<h1>Demo {number}</h1>

```

Los usuarios pueden cambiar el estado, en este ejemplo se va a agregar un boton para el cambio, lo primero es crear una constante para la accion de aumentar el numero. Eso se agrega en constants.js

```javascript

export  const  ADD_TO_NUMBER  =  'ps/Demo/ADD_TO_NUMBER'

```

La nomenclatura es: nombre_de_la_aplicacion/nombre_container/accion

Ya que la constante fue creada, se puede crear la accion, esta se agrega en el archivo actions.js

```javascript

import { ADD_TO_NUMBER } from  './constants'

/**

* Adds n to number

* @param  {int}  n Valor para agregar a number

* @return  {object} An action object with a type of ADD_TO_NUMBER

*/

export  function  addToNumber(n) {

return {

type:  ADD_TO_NUMBER,

value_to_add:  n,

};

}

```

Los comentarios generan la descripcion de la funcion. Ahora se puede importar en el index.js

```javascript

...

import { addToNumber } from  './actions';

...

export  function  mapDispatchToProps(dispatch) {

return {

onAddToNumber:  (n)  =>  dispatch(addToNumber(n)),

};

}

...

```

Al igual que se hizo con la variable number, se tiene que pasar la funcion como prop:

```javascript

const  DemoPage  =  ({number,  onAddToNumber})  => {

```

y ahora se puede agregar a elementos como un boton:

```html

<div

onClick={()  => onAddToNumber(Math.random() * 10)}

className="btn">Agregar Numero

</div>

```

Ahora cuando se haga click en el boton, la accion va a llegar al reducer, ahora se tiene que agregar el cambio del estado, en reducer.js

```javascript

...

import { ADD_TO_NUMBER } from  './constants'

...

...

switch (action.type) {

...

case  ADD_TO_NUMBER:

draft.number  =  draft.number  +  action.value_to_add

break

...

}

...

```

### Anatomia - Contenedor
Cada contenedor es creado dentro de la carpeta containers/ en una carpeta con el nombre del contenedor **containers/ContenedorNombre**.
Dentro de la carpeta se encuentran varios archivos:

 - **actions.js** - Exporta las acciones, cada acción es una función que se encarga de actualizar el estado.
 - **constants.js** - Exporta las constantes, cada constante es un string único para cada una de las acciones 
 - **index.js** - Declara el contenedor 
 - **reducer.js** - Declara el reducer que se encarga de recibir las ejecuciones de las acciones y se encarga de ejecutar los cambios al estado que se indiquen 
 - **selectors.js** - Declara los selectores, cada selector es una función que se encarga de devolver una parte del estado.

Son elementos están conectados al estado de la aplicación y cuentan con métodos para consultarlo y actualizarlo. Su estructura básica es la siguiente: 

```javascript
import React, {useEffect, memo} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from './../../utils/injectReducer'
import { useInjectSaga } from './../../utils/injectSaga'

import { selectExample } from './actions'
import { makeSelectExample } from './selectors'
import reducer from './reducer'
import saga from './saga'
const key = 'ultimate'
export function ExampleContainer({example, onSelectExample}){
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  useEffect(() => {}, [])
  return (
    <div>
      <p>Contenido</p>
    </div>
  )
}

ExampleContainer.propTypes = {
  example: PropTypes.string,
  onSelectExample: PropTypes.function,
}

const mapStateToProps = createStructuredSelector({
  example: makeSelectExample(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onSelectExample: (product) => dispatch(selectExample(product)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)


export default compose(
  withConnect,
  memo,
)(ExampleContainer)
```
Para obtener elementos del estado se utiliza **mapStateToProps**, cada unos de los selectores es una función que regresa una parte del estado, cada una de los selectores se exportan desde el archivo selectors.js

Para actualizar el estado se utiliza **mapDispatchToProps**, cada una de las funciones que se declaran en el archivo actions.js.

Para poder utilizar los elementos del estado y las funciones estas se agregan como parámetros a la función que crea el contenedor 
```javascript
ExampleContainer({example, onSelectExample})
```
Hay 3 funciones que vale la pena mencionar **useInjectReducer** que permite conectarse al estado, **useInjectSaga** que no es obligatoria pero se debe usar cuando se hagan llamadas a cualquier servicio externo y por último [**useEffect**](https://reactjs.org/docs/hooks-effect.html) esta función permite ejecutar código que tiene efectos secundarios (llamada a un API, leer un archivo, etc).

Finalmente cada función que genere un contenedor debe tener un  **return** , este debe regresar la estructura html que conforma el contenedor.
```javascript 
return (
    <div>
      <p>Contenido</p>
    </div>
  )
```
Después de la declaración del contenedor se encuentra la validación de los parámetros que reciben la función de creación del contenedor, en este caso la variable example debería ser un String y onSelectExample debe ser una función:
```javascript
ExampleContainer.propTypes = {
  example: PropTypes.string,
  onSelectExample: PropTypes.function,
}
```


### Componente
La diferencia de los componentes con respecto a los contenedores es que estos no tienen conexión con el estado, toda la información que necesitan para funcionar es pasada desde el contenedor que contiene el componente, estos se crean dentro de la carpeta /components, creando una carpeta **/components/NombreComponente** esta carpeta solo contiene un archivo llamado index.js, y ahi se coloca la declaración del componente, su estructura básica es:
```javascript
const Componente = ({param1, param2, ...}) => {
  return (
    <div>
      <p>Componente</p>
    </div>
  )
}
export default Componente;
```

