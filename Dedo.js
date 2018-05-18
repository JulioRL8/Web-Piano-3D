/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Dedo extends THREE.Object3D{
    
    constructor(){
        super();
        
        this.material   = new THREE.MeshPhongMaterial ({color: 0xfdddca,  specular: 0x111111, emissive: 0x0, shininess: 70}) ;
        
        this.parte1= this.createParte1();
        this.parte2= this.createParte2();
        this.parte3= this.createParte3();
        
        this.add(this.parte1);
        this.add(this.parte2);
        this.add(this.parte3);
        
        this.position.y=14;
        this.rotation.y= 3.141516/2;
        this.position.z= 50;
    }
    
    createParte1(){
        var falange= new THREE.Mesh(
                new THREE.CylinderGeometry(3,3,8), this.material);
        falange.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(3.141516/2));
        //falange.rotation.z= 3.141516;
        
        var esfera=new THREE.Mesh(
                new THREE.SphereGeometry(2.9,32,32), this.material);
        esfera.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(4,0,0));
        
        falange.add(esfera);
        
        return falange;
        
    }
    
    createParte2(){
        var falange= new THREE.Mesh(
                new THREE.CylinderGeometry(3,3,6), this.material);
        falange.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(3.141516/2));
        falange.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(3,0,0));
        
        var esfera=new THREE.Mesh(
                new THREE.SphereGeometry(2.9,32,32), this.material);
        esfera.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(6,0,0));
       
        
        esfera.add(falange);
        esfera.rotation.z= -(3.141516/4);
        esfera.position.x= 4;
        
        return esfera;
    }
    
    createParte3(){
        var falange= new THREE.Mesh(
                new THREE.CylinderGeometry(3,3,4), this.material);
        falange.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(3.141516/2));
        falange.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(2,0,0));
        
        var esfera=new THREE.Mesh(
                new THREE.SphereGeometry(2.9,32,32), this.material);
        esfera.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(4,0,0));
       
        
        esfera.add(falange);
        esfera.rotation.z= -(3.141516/2);
        esfera.position.x= 8.25;
        esfera.position.y= -4.5;
        
        return esfera;
    }
    
}