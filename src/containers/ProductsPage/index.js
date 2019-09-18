import React from 'react';
import joint from 'jointjs/index';
import ReactDOM from 'react-dom';
import Playground from './../../components/Playground';


const Product = (props) => {
  return(
    <div className="card" style={{width: '18rem', textAlign:'left', margin:'8px'}}>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Tipo: {props.type}</h6>
        
        {props.modifiers.map((modifier) => {
          return (
            <div>
              <button type="button" class="btn btn-info" style={{width:'100%', margin:'4px 0 4px 0'}}>
                <span style={{float:'left'}}>{modifier.name}</span>
                <span style={{float:'right'}}>{modifier.cost}</span>
              </button>
            </div>
        )})}


        <div className="btn btn-primary" style={{width:'100%', marginTop:'24px'}} onClick={() => {props.addModifier(props.name, props.type)}}>+</div>
      </div>
    </div>
  )
}



class ProductsPage extends React.Component {

  constructor(props){
    super(props)
    this.graph = new joint.dia.Graph();
    this.state= {
      newProduct: '',
      products:[
        {name: 'Tamaño', 
        type: 'Producto a', 
        modifiers:[
          {name: 'grande', cost: '50'}, 
          {name: 'mediano', cost: '40'}, 
          {name: 'peque', cost: '30'}
        ]},

        {name: 'Tipo de leche', 
        type: 'Producto a', 
        modifiers:[
          {name: 'natural', cost: '0'}, 
          {name: 'deslactosada', cost: '10'}, 
          {name: 'almendra', cost: '15'}
        ]},

        {name: 'Textura', 
        type: 'Producto a', 
        modifiers:[
          {name: 'iced', cost: '0'}, 
          {name: 'cold', cost: '0'}, 
          {name: 'hot', cost: '0'}
        ]},

    ],
      isVisiblePrdForm: false,
      newPrdSelect: '',
      prdsSelect:[],
      selectedPrd: '',
      createModifierBlock: '',
      createModifierProduct:'',
      isVisibleCreateModifier: false,
      createModifierName:'',
      createModifierHasCost: false,
      createModifierCost: '',
      isVisibleChart: true,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.addModifier = this.addModifier.bind(this)
    this.createModifier = this.createModifier.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createProduct(){
    const products = this.state.products
    const newProduct = this.state.newProduct
    const type = this.state.selectedPrd
    this.setState({
      products: products.concat({
        name: newProduct,
        type: type,
        modifiers:[]
      }), 
      newProduct: '',
    })
  }

  deleteProduct(p){
    let products = this.state.products;
    let updatedPrds = products.filter(product => product.name !== p);
    this.setState({products: updatedPrds});
  }

  addModifier(blockName, productName){
    this.setState({
      createModifierBlock: blockName,
      createModifierProduct: productName,
      isVisibleCreateModifier: true,
    })
  }

  createModifier(){
    const modName = this.state.createModifierName
    const modCost = this.state.createModifierCost
    const products = this.state.products
    const finder = prd => prd.name === this.state.createModifierBlock
    const productToModify = products.find(finder)
    const productIndex = products.findIndex(finder)

    productToModify.modifiers = 
      productToModify.modifiers.concat({
      name: modName,
      cost: modCost
    })

    products[productIndex] = productToModify

    this.setState({
      products: products,
      isVisibleCreateModifier: false,
      createModifierName: '',
      createModifierCost: '',
    })
  }


  render(){
    return (
      <div>
        <h1>Blocks</h1>

        <div className={"form-group " + (this.state.isVisibleChart ? '' : 'd-none')} style={{position:'absolute', width:'100vw', height:'100vh', backgroundColor:'white', zIndex:'1'}}>
          <Playground products={this.state.products} deleteProduct={this.deleteProduct} />
        </div>

        <div className={"form-group " + (this.state.isVisibleCreateModifier ? '' : 'd-none')} style={{position: 'absolute', right:'0', top:'0', margin:'16px 16px 0 0', textAlign:'left'}}>
          <label>Agregar Modificador</label>
          <input type="text" name="createModifierName" className="form-control" placeholder="Modificador" onChange={this.handleInputChange}/>
          <div className="form-check">
            <input className="form-check-input" name="createModifierHasCost" type="checkbox" checked={this.state.createModifierHasCost} onChange={this.handleInputChange}/>
            <label className="form-check-label">
              Tiene costo?
            </label>
          </div>
          <div className={"form-group " + (this.state.createModifierHasCost ? '' : 'd-none')}>
            <input type="text" name="createModifierCost" className="form-control" placeholder="$ Costo" onChange={this.handleInputChange}/>
          </div>
          <div className="btn btn-primary" style={{width:'100%', marginTop:'8px'}} onClick={this.createModifier}> Agregar </div>
        </div>

        <div className={"form-group " + (this.state.isVisiblePrdForm ? '' : 'd-none')} style={{position: 'absolute', right:'0', top:'0', margin:'16px 16px 0 0', textAlign:'left'}}>
          <label>Agregar Producto</label>
          <input type="text" value={this.state.newPrdSelect} className="form-control" name="newPrdSelect" onChange={this.handleInputChange} placeholder="Agregar Producto"/>
          <div className="btn btn-primary" style={{width:'100%', marginTop:'8px'}} onClick={()=> {this.setState({prdsSelect: this.state.prdsSelect.concat(this.state.newPrdSelect), isVisiblePrdForm: false, newPrdSelect:''})}}> Agregar </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6 form-group" style={{textAlign:'left'}}>
            <label>Nuevo</label>
            <input type="text" value={this.state.newProduct} className="form-control" placeholder="Nuevo" name="newProduct" onChange={this.handleInputChange} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6 form-group" style={{textAlign:'left'}}>
            <div className="input-group">
              <select className="form-control" name="selectedPrd" onChange={this.handleInputChange}>
                <option>Seleccionar un producto</option>
                {this.state.prdsSelect.map((product)=>
                  <option>{product}</option>
                )}
              </select>
              <div className="input-group-append" onClick={()=>{this.setState({isVisiblePrdForm: true})}}>
                <span className="input-group-text"> + </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="btn btn-primary" onClick={this.createProduct} style={{margin:'20px'}}>Crear</div>
          <div className="btn btn-primary" onClick={()=>this.setState({isVisibleChart: true})} style={{margin:'20px'}}>Crear flujos</div>
        </div>
        <div className="row">
            {this.state.products.map((product) => {
              return (
                <Product name={product.name} type={product.type} modifiers={product.modifiers} addModifier={this.addModifier}/>
              )
            })}
        </div>
      </div>
    );
  }
}

export default ProductsPage;