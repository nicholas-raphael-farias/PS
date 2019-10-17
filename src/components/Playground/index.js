import React from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs/index';
import { layout, shapes } from 'jointjs';
import _ from 'lodash';
import $ from 'jquery';

class Playground extends React.Component {

  constructor(props){
    super(props);
    this.graph = new joint.dia.Graph();
    this.createTemplate = this.createTemplate.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  createTemplate() {

    const productTemplates = this.props.products.map(product => {
      return `<div class="btn btn-info" style="width:100%; margin-bottom:4px;">${product.name}</div>`;
    });

    return `<div class="card" style="padding: 8px; border: none;">${productTemplates.join("")}</div>`;
  };

  removeProduct(p){
    this.props.deleteProduct(p);
  };

  componentDidMount(){
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.refs.placeholder),
      width: 1200,
      height: 400,
      gridSize: 10,
      model: this.graph,
      interactive: false,
      background: {color: '#EFF2F7'},   
    });

    // Create a custom element.
    // ------------------------

    joint.shapes.html = {};
    joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
        defaults: joint.util.deepSupplement({
            type: 'html.Element',
            attrs: {
                rect: { stroke: 'none', 'fill-opacity': 0 }
            }
        }, joint.shapes.basic.Rect.prototype.defaults)
    });



    // Create a custom view for that element that displays an HTML div above it.
    // -------------------------------------------------------------------------

    joint.shapes.html.ElementView = joint.dia.ElementView.extend({

      template: this.createTemplate(),
      initialize: function() {
          _.bindAll(this, 'updateBox');
          joint.dia.ElementView.prototype.initialize.apply(this, arguments);
          this.$box = $(_.template(this.template)());
          // Prevent paper from handling pointerdown.
          this.$box.find('input,select').on('mousedown click', function(evt) {
              evt.stopPropagation();
          });
          // This is an example of reacting on the input change and storing the input data in the cell model.
          this.$box.find('.btn').on('click', _.bind((evt) => {
            const e = evt.target;
            let p = e.parentNode;
            p.innerHTML = '';
            p.appendChild(e);
            this.$box.css({height: '0px', top:'-8px', position: 'absolute'});
            this.removeProduct(e.innerHTML);
          }, this));
      },
      render: function() {
          joint.dia.ElementView.prototype.render.apply(this, arguments);
          this.paper.$el.prepend(this.$box);
          this.updateBox();
          return this;
      },
      updateBox: function() {
          // Set the position and dimension of the box so that it covers the JointJS element.
          var bbox = this.model.getBBox();
          // Example of updating the HTML with a data stored in the cell model.
          this.$box.find('label').text(this.model.get('label'));
          this.$box.find('span').text(this.model.get('select'));
          this.$box.css({
              width: bbox.width,
              height: bbox.height,
              left: bbox.x,
              top: bbox.y,
              transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
          });
      },
      removeProduct: (p) => this.removeProduct(p)
  });



    // Create JointJS elements and add them to the graph as usual.
    // -----------------------------------------------------------

    var el1 = new joint.shapes.html.Element({
      position: { x: 300, y: 0 },
      size: { width: 170, height: 0 },
      label: 'I am HTML',
      select: 'one'
  });




    const rectInit = new joint.shapes.basic.Circle({ 
      position: { x: 0, y: 0 },
      size: { width: 30, height: 30 },
      attrs: { text: { text: '+' } }
    });

    const rect = new joint.shapes.basic.Rect({ 
      position: { x: 50, y: 0 },
      size: { width: 130, height: 30 },
      attrs: { text: { text: 'lista de productos' } }
    });

    const rectFinal = new joint.shapes.basic.Circle({ 
      position: { x: 200, y: 0 },
      size: { width: 30, height: 30 },
      attrs: { text: { text: '+' } }
    });
    

    const l1 = new joint.dia.Link({ source: { id: rectInit.id }, target: { id: rect.id }  });
    const l2 = new joint.dia.Link({ source: { id: rect.id }, target: { id: rectFinal.id }  });

    l1.attr({
      '.marker-arrowhead[end="source"]': { display: 'none'},
      '.marker-arrowhead[end="target"]': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
      '.tool-remove': { display: 'none'},
      '.tool-options': { display: 'none'},
    });

    l2.attr({
      '.marker-arrowhead[end="source"]': { display: 'none'},
      '.marker-arrowhead[end="target"]': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
      '.tool-remove': { display: 'none'},
      '.tool-options': { display: 'none'},
    });

    this.graph.addCells([rectInit, rect, rectFinal, l1, l2]);


    this.paper.on('element:pointerclick', (e, evt, x, y) => {


      console.log(e);
      console.log(evt);
      console.log(x);
      console.log(y);

      if(e.model.attr('text/text') === '+') {

        var el1 = new joint.shapes.html.Element({
          position: { x: e.model.attributes.position.x + e.model.attributes.size.width + 30 , y: e.model.attributes.position.y },
          size: { width: 120, height: 40 },
        });
  
        const optc = new joint.shapes.basic.Circle({ 
          position: { x: el1.attributes.position.x + el1.attributes.size.width + 30, y: el1.attributes.position.y },
          size: { width: 30, height: 30 },
          attrs: { text: { text: '+' } }
        });
  
        const l = new joint.dia.Link({ source: { id: e.model.id }, target: { id: el1.id }  });
        const l2 = new joint.dia.Link({ source: { id: el1.id }, target: { id: optc.id }  });
  
        l.attr({
          '.marker-arrowhead[end="source"]': { display: 'none'},
          '.marker-arrowhead[end="target"]': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
          '.tool-remove': { display: 'none'},
          '.tool-options': { display: 'none'},
        });
  
        l2.attr({
          '.marker-arrowhead[end="source"]': { display: 'none'},
          '.marker-arrowhead[end="target"]': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
          '.tool-remove': { display: 'none'},
          '.tool-options': { display: 'none'},
        });
  
        this.graph.addCells([el1, optc, l, l2]);
      }


    });

  }

  render(){
    return (<div id="playground" ref="placeholder"></div>);
  }

}

export default Playground;