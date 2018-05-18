/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Piano extends THREE.Object3D{
    
    constructor(){
        super();
        
        this.octava= null;
        this.octavas= this.createOctavas();
        this.numOctava= 2;
        
        for(var i=0; i<this.octavas.length; i++){
            this.add(this.octavas[i]);
        }
    }
    
    //CREA LAS DISTINTAS OCTAVAS Y LAS ORGANIZA
  createOctavas(){
      
      var octavas= [ new Octava(24),new Octava(36), new Octava(), new Octava(60), new Octava(72)];
      //TheScene.NUM_OCTAVAS= this.octavas.length;
      
      //8 cada tecla, el espacio de cada tecla es 0.2
      var tamanioOctava= 8 * 7 + 0.2 * 6;
      octavas[0].position.x= -1 * 2 * (tamanioOctava + 0.2);
      octavas[1].position.x= -1* (tamanioOctava + 0.2);
      octavas[3].position.x= tamanioOctava + 0.2;
      octavas[4].position.x= 2 * (tamanioOctava + 0.2);
      
      this.octava= octavas[2];
      return octavas;
  }
  
  //Metodo que ejecutará el listener
  senialNota(nota, mensaje){
      var oct;
        //alert("hola");
        if(nota >= 24 && nota<=35){
            oct= 0;
        }else if(nota >= 36 && nota<=47){
            oct= 1;
        }else if(nota >= 48 && nota<=59){
            oct= 2;
        }else if(nota >= 60 && nota<=71){
            oct= 3;
        }else if(nota >= 72 && nota<=83){
            oct= 4;
        }
        //alert("pepino");
        if(mensaje===144){
            switch(nota%12){
                case 0: this.octavas[oct].pulsar("do"); break;
                case 1: this.octavas[oct].pulsar("dosos"); break;
                case 2: this.octavas[oct].pulsar("re"); break;
                case 3: this.octavas[oct].pulsar("resos"); break;
                case 4: this.octavas[oct].pulsar("mi");break;
                case 5: this.octavas[oct].pulsar("fa"); break;
                case 6: this.octavas[oct].pulsar("fasos"); break;
                case 7: this.octavas[oct].pulsar("sol"); break;
                case 8: this.octavas[oct].pulsar("solsos");break;
                case 9: this.octavas[oct].pulsar("la"); break;
                case 10: this.octavas[oct].pulsar("lasos");break;
                case 11: this.octavas[oct].pulsar("si");break;
            }
        }
        else if(mensaje===128){
            switch(nota%12){
                case 0: this.octavas[oct].soltar("do"); break;
                case 1: this.octavas[oct].soltar("dosos"); break;
                case 2: this.octavas[oct].soltar("re"); break;
                case 3: this.octavas[oct].soltar("resos"); break;
                case 4: this.octavas[oct].soltar("mi");break;
                case 5: this.octavas[oct].soltar("fa"); break;
                case 6: this.octavas[oct].soltar("fasos"); break;
                case 7: this.octavas[oct].soltar("sol"); break;
                case 8: this.octavas[oct].soltar("solsos");break;
                case 9: this.octavas[oct].soltar("la"); break;
                case 10: this.octavas[oct].soltar("lasos");break;
                case 11: this.octavas[oct].soltar("si");break;
            }
        }
  }
  
  teclaPulsada(codigo){
     
      switch(codigo){
          case 90: this.octava.pulsar("do"); break;
          case 88: this.octava.pulsar("re"); break;
          case 67: this.octava.pulsar("mi"); break;
          case 86: this.octava.pulsar("fa"); break;
          case 66: this.octava.pulsar("sol"); break;
          case 78: this.octava.pulsar("la"); break;
          case 77: this.octava.pulsar("si"); break;
          
          case 83: this.octava.pulsar("dosos"); break;
          case 68: this.octava.pulsar("resos"); break;
          case 71: this.octava.pulsar("fasos"); break;
          case 72: this.octava.pulsar("solsos"); break;
          case 74: this.octava.pulsar("lasos"); break;
              
          case 81: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("do"); break;
          case 87: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("re"); break;
          case 69: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("mi"); break;
          case 82: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("fa"); break;
          case 84: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("sol"); break;
          case 89: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("la"); break;
          case 85: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("si"); break;
          
          case 50: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("dosos"); break;
          case 51: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("resos"); break;
          case 53: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("fasos"); break;
          case 54: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("solsos"); break;
          case 55: this.octavas[(this.numOctava+1)%this.octavas.length].pulsar("lasos"); break;
      }
  }
  
  teclaSoltada(codigo){
     
      switch(codigo){
          case 90: this.octava.soltar("do"); break;
          case 88: this.octava.soltar("re"); break;
          case 67: this.octava.soltar("mi"); break;
          case 86: this.octava.soltar("fa"); break;
          case 66: this.octava.soltar("sol"); break;
          case 78: this.octava.soltar("la"); break;
          case 77: this.octava.soltar("si"); break;
              
              
          case 83: this.octava.soltar("dosos"); break;
          case 68: this.octava.soltar("resos"); break;
          case 71: this.octava.soltar("fasos"); break;
          case 72: this.octava.soltar("solsos"); break;
          case 74: this.octava.soltar("lasos"); break;
              
          case 81: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("do"); break;
          case 87: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("re"); break;
          case 69: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("mi"); break;
          case 82: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("fa"); break;
          case 84: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("sol"); break;
          case 89: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("la"); break;
          case 85: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("si"); break;
          
          case 50: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("dosos"); break;
          case 51: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("resos"); break;
          case 53: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("fasos"); break;
          case 54: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("solsos"); break;
          case 55: this.octavas[(this.numOctava+1)%this.octavas.length].soltar("lasos"); break;
             
      }
      
  }
  
  setOctava(num){
      if(num<this.octavas.length && num>=0){
          this.octava= this.octavas[num];
          this.numOctava=num;
      }
  }

  
}
