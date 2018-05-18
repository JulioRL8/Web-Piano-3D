
/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {
  
  constructor (renderer) {
    super();
    
    // Attributes
    
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.cameraNormal= null;
    this.trackballControls = null;
    this.ground = null;

    this.piano=null;
    this.teclas= {90:false,88:false,67:false,86:false,66:false,78:false,77:false,83:false,68:false,71:false,72:false,74:false,75:false, 81:false,87:false,69:false,82:false,84:false,89:false,85:false,73:false,50:false,51:false,53:false,54:false,55:false};
     
    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add(this.axis);
    this.model = this.createModel();
    this.background= new THREE.Color(0x000000);
    this.add (this.model);
  }
  
  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    
    this.cameraNormal = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.cameraNormal.position.set (0, 60, 100);
    var look = new THREE.Vector3 (0,0,0);
    this.cameraNormal.lookAt(look);
    
    this.camera= this.cameraNormal;

    this.trackballControls = new THREE.TrackballControls (this.cameraNormal, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look;
    
    this.add(this.camera);
  }
  
  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff/*0xccddee*/, 0.4);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    /*this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 100, 100, 100 );
    this.spotLight.castShadow = true;
    this.spotLight.distance= 500*/
        
    this.spotLight= new THREE.DirectionalLight(0xffffff,1);
    this.spotLight.position.set( 0, 100, 0);
    //this.spotLight.target= this.octava;
   
    // the shadow resolution
    //this.spotLight.shadow.mapSize.width=2048;
    //this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);
  }
  
  /// It creates the geometric model: crane and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D();
    
    this.piano= new Piano();
    this.add(this.piano);
    
    //this.createMIDI();
    
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("./imgs/pexels-photo-734918.jpeg");
    this.ground = new Ground (300, 300, new THREE.MeshPhongMaterial ({map: textura}), 4);
    model.add (this.ground);
    
    return model;
  }
  
  
  ///CREA EL MIDI
  createMIDI(){
      
      MIDI.loadPlugin({
		/*targetFormat: "mp3", // optionally can force to use MP3 (for instance on mobile networks)
		instrument: "acoustic_grand_piano", // or 1 (default)
		onprogress: function(state, progress) {
			console.log(state, progress);
		},*/
                soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			
			// play the note
			MIDI.setVolume(0, 127);
			
		}
	});
        
          
  }
  
  
  //Metodo que ejecutará el listener
  senialNota(nota, mensaje){
      this.piano.senialNota(nota,mensaje);
  }
 
  
  /// It sets the crane position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;
    this.piano.setOctava(controls.octava);
  }
  
  
 
  
  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    return this.camera;
  }
  
  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.trackballControls;
  }
  
  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
  
  teclaPulsada(codigo){
      if(this.teclas[codigo.toString()]===false){
        this.piano.teclaPulsada(codigo);
        this.teclas[codigo.toString()]=true;
      }
  }
  
  teclaSoltada(codigo){
     
      this.piano.teclaSoltada(codigo);
      this.teclas[codigo.toString()]=false;
  }
  
}


 //Class variables 
  TheScene.NUM_OCTAVAS=0;
  



