/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class TeclaNegra extends THREE.Object3D{
    
    constructor(nota){
        super();
         
        this.material   = new THREE.MeshPhongMaterial ({color:0x000000,  specular: 0x111111, emissive: 0x0, shininess: 70}) ;

        this.note=nota;
        this.teclaPulsada= false;
        this.dedo= new Dedo();
        this.dedo.position.z=26.5;
        this.dedo.position.y += 3.5;

        this.pulsa=null;
        this.suelta=null;

        this.actualizarPulsa();
        this.actualizarSuelta();
         
        this.tecla= this.createTecla();
        this.add(this.tecla);
    }
    
    createTecla(){
        var tec= new THREE.Mesh(
                new THREE.BoxGeometry(3,3,24), this.material);
        tec.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0,0,9));
        tec.position.y= 1.5 + 3 ;
        
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
                   material.setValues( {color: 0x000000});
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
