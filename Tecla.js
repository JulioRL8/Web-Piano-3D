/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Tecla extends THREE.Object3D{
    
    constructor(nota){
        super();
    
         //this.material   = new THREE.MeshPhongMaterial ({color: 0xffffff,  specular: 0x111111, emissive: 0x0, shininess: 70}) ;
        var loader = new THREE.TextureLoader();
        var textura = loader.load ("./imgs/TeclaBlanca.jpg");
        this.material = new THREE.MeshPhongMaterial ({map:textura}) ;
        
        this.note= nota;
        this.dedo= new Dedo();
        this.tecla= this.createTecla();
        
        
        
        //OBJETOS TWEEN
        this.suelta=null;
        this.pulsa=null;
        
        this.actualizarSuelta();
        this.actualizarPulsa();
         
         
        this.add(this.tecla);
    }
    
    createTecla(){
        var tec= new THREE.Mesh(
                new THREE.BoxGeometry(8,3,50), this.material);
        tec.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0,0,22));
        tec.position.y= 1.5;
        
        return tec;
    }
    
    actualizarSuelta(){
        //TWEEN
            var tec= this.tecla;
            var dedo= this.dedo;
            var obj= this;
            var material= this.material;
            var coord=  {x:0.055, z:-0.2} ;
            var destino= {x:0, z:0};
            
            var tween = new TWEEN.Tween(coord).to(destino, 100);

            tween.onUpdate( function() {
                tec.rotation.x= coord.x;
                dedo.rotation.z= coord.z;
            });
            tween.onComplete( function(){
                
                   obj.remove(dedo);
                   material.setValues( {color: 0xfffffff});
            });
        this.suelta= tween;
    }
    
    actualizarPulsa(){
         var tec= this.tecla;
        var dedo= this.dedo;
        var obj= this;
        var suelta= this.suelta;
        var material= this.material;

        //TWEEN
            var coord=  {x:0, z:0} ;
            var destino= {x:0.055, z:-0.2};
            var tween= new TWEEN.Tween(coord).to(destino, 100);

            tween.onUpdate( function() {
                tec.rotation.x= coord.x;
                dedo.rotation.z= coord.z;});
            tween.onStart( function(){
                suelta.stop();
                obj.add(dedo);
                material.setValues( {color: 0xff0000});
            
                //teclaPulsada= true;
            });
            
        //
        
        this.pulsa=tween;
    }
    
    pulsar(){
       
        this.actualizarPulsa();
        this.pulsa.start();
       
       MIDI.noteOn(0, this.note, 127, 0);
      
    }
    
    soltar(){
        
        this.actualizarSuelta();
        this.suelta.start();
        
        MIDI.noteOff(0, this.note, 0);
        
    }
    
}

