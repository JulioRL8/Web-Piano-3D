/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Octava extends THREE.Object3D{
    
    constructor(notaInicial){
        super();
    
         this.material   = new THREE.MeshPhongMaterial ({color: 0xd5e8ee,  specular: 0x111111, emissive: 0x0, shininess: 70}) ;
        
        
        //Asegurarnos de que la notaInicial es un do
        if(notaInicial!==0 && notaInicial!==12 && notaInicial!==24 && notaInicial!==36 && notaInicial!==48 && notaInicial!==60 && notaInicial!==72 && notaInicial!==84 && notaInicial!==96 && notaInicial!==108 && notaInicial!==120 ){
            notaInicial=48;
        }
        
        this.do= new Tecla(notaInicial);
        this.re= new Tecla(notaInicial+2);
        this.mi= new Tecla(notaInicial+4);
        this.fa= new Tecla(notaInicial+5);
        this.sol= new Tecla(notaInicial+7);
        this.la= new Tecla(notaInicial+9);
        this.si= new Tecla(notaInicial+11);
        
        this.dosos= new TeclaNegra(notaInicial+1);
        this.resos= new TeclaNegra(notaInicial+3);
        this.fasos= new TeclaNegra(notaInicial+6);
        this.solsos= new TeclaNegra(notaInicial+8);
        this.lasos= new TeclaNegra(notaInicial+10);
        
        
        this.organizarTeclas();
        
        this.add(this.do);
        this.add(this.re);
        this.add(this.mi);
        this.add(this.fa);
        this.add(this.sol);
        this.add(this.la);
        this.add(this.si);
        
        this.add(this.dosos);
        this.add(this.resos);
        this.add(this.fasos);
        this.add(this.solsos);
        this.add(this.lasos);
        
    }
    
    organizarTeclas(){
        this.mi.position.x= -8.2;
        this.re.position.x= -16.4;
        this.do.position.x= -24.6;
        
        this.sol.position.x= 8.2;
        this.la.position.x= 16.4;
        this.si.position.x=24.6;
        
        //Primero colocamos el fa sostenido; y sumando y restando 8.2 distribuimos el resto de teclas
        this.fasos.position.x= 1.5 + 1+ 1.5;
        this.solsos.position.x= this.fasos.position.x + 8.2 ;
        this.lasos.position.x= this.fasos.position.x + 8.2 *2;
        this.resos.position.x= this.fasos.position.x - 8.2 * 2 ;
        this.dosos.position.x= this.fasos.position.x - 8.2 *3;
        
    }
    
    pulsar(tecla){
        
        switch(tecla){
            case "do": this.do.pulsar();  break;
            case "re": this.re.pulsar(); break; 
            case "mi": this.mi.pulsar(); break;
            case "fa": this.fa.pulsar(); break;
            case "sol": this.sol.pulsar(); break;
            case "la": this.la.pulsar(); break;
            case "si": this.si.pulsar(); break;
            
          
            case "dosos": this.dosos.pulsar(); break;
            case "resos": this.resos.pulsar(); break; 
            case "fasos": this.fasos.pulsar(); break;
            case "solsos": this.solsos.pulsar(); break;
            case "lasos": this.lasos.pulsar(); break;
        }
    }
    
    soltar(tecla){
        
        switch(tecla){
            case "do": this.do.soltar(); break;
            case "re": this.re.soltar(); break; 
            case "mi": this.mi.soltar(); break;
            case "fa": this.fa.soltar(); break;
            case "sol": this.sol.soltar(); break;
            case "la": this.la.soltar(); break;
            case "si": this.si.soltar(); break; 
                
            case "dosos": this.dosos.soltar(); break;
            case "resos": this.resos.soltar(); break; 
            case "fasos": this.fasos.soltar(); break;
            case "solsos": this.solsos.soltar(); break;
            case "lasos": this.lasos.soltar(); break;
        }
    }
    
}
