
/// Several functions, including the main

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

//Cancion y tempo
cancion=null;
tempo= 120;
tempoActivado=false;

/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

cancionesArchivos ={
        "Game Of Thrones Theme, Ramin Djawadi": "game_of_thrones.mid",
        "Mario Overworld Theme (Super Mario Bros 3), Koji Kondo": "mario_-_overworld_theme.mid",                                    
        "He's a Pirate (Pirates of the Caribbean), Klaus Badelt" : "hes_a_pirate.mid",
        "Hedwigs Theme (Harry Potter), John Williams": "hedwigs_theme.mid",
        "Something There (Beauty and the Beast), Alan Menken":"something_there.mid",
        "Cruel Angel Thesis (Neon Genesis Evangelion)": "cruel_angel__s_thesis.mid",
        "Me cuesta tanto olvidarte (Mecano)": "me_cuesta.mid",
        "Sonata No. 14 C# minor (Moonlight), Beethoven": "mond_1.mid",
        "For Elise, Beethoven": "for_elise_by_beethoven.mid",                                    
        "Asturias (Leyenda), Albeniz": "alb_se5_format0.mid",
        "Aragon (Fantasia), Albeniz": "alb_se6.mid",
        "Prelude and Fugue in C major BWV 846, Bach": "bach_846.mid",
        "Fantasia C major, Schubert": "schub_d760_1.mid",
        "Sonata No. 16 C major, Mozart": "mz_545_1.mid",			    
        "Sonata No. 11 A major (K331, First Movement), Mozart": "mz_331_1.mid",
        "March - Song of the Lark, Tchaikovsky":"ty_maerz.mid",
        "Piano Sonata in C major, Hoboken, Haydn": "haydn_35_1.mid",
        "Etudes, Opus 25, Chopin": "chpn_op25_e1.mid",
        "Polonaise Ab major, Opus 53, Chopin": "chpn_op53.mid",
        "No. 2 - Oriental, Granados": "gra_esp_2.mid",
        "Bohemian Rhapsody, Queen": "bohemian1.mid"                                    
    };

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = true;
    this.lightIntensity = 0.5;
    this.octava= 2;
    this.cancion= "game_of_thrones.mid";
    this.play= function(){
        MIDI.Player.resume();
    };
    this.pause= function(){
        MIDI.Player.pause();
    };
    this.tempo=120;
    this.activarTempo=false;
    
    cancion= this.cancion;
    MIDI.Player.loadFile("../midi/" + this.cancion);
    
  };
  
  var gui = new dat.GUI({hideable:false});
  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :');
    
  var Piano = gui.addFolder ('Piano');
    Piano.add(GUIcontrols, 'octava', 0 , 4, 1).name('Octava');
    var song= Piano.add(GUIcontrols, 'cancion', cancionesArchivos).name('Cancion');
    var act= Piano.add(GUIcontrols, 'activarTempo').name('Activar el tempo modificable');
    var tem= Piano.add(GUIcontrols,'tempo', 60, 200, 1).name('Tempo');
    Piano.add(GUIcontrols, 'play');
    Piano.add(GUIcontrols, 'pause');
    
  
  song.onChange(function(value){
      MIDI.Player.stop();
      if(tempoActivado) MIDI.Player.BPM= tempo;
      else MIDI.Player.BPM= null;
      cancion= value;
      MIDI.Player.loadFile("../midi/" + value);
      MIDI.Player.timeWarp = 1.0;
  });
  
  tem.onChange( function(value){
      tempo= value;
      if(tempoActivado){
        
        MIDI.Player.stop();
        MIDI.Player.BPM=value;
        MIDI.Player.loadFile("../midi/" + cancion);
    }
      //alert(cancion);
  });
  
  act.onChange( function(value){
      tempoActivado= value;
      MIDI.Player.stop();
      if(tempoActivado) {MIDI.Player.BPM= tempo;}
      else {MIDI.Player.BPM= null;}
      MIDI.Player.loadFile("../midi/" + cancion);
  });
  
  
  
  if (withStats)
    stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {
  
  var stats = new Stats();
  
  stats.setMode(0); // 0: fps, 1: ms
  
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  
  $("#Stats-output").append( stats.domElement );
  
  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}





/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
}

/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;  
}

/// It renders every frame
function render() {
  requestAnimationFrame(render);
  
  stats.update();
  scene.getCameraControls().update ();
  scene.animate(GUIcontrols);
  TWEEN.update();
  
  renderer.render(scene, scene.getCamera());
}

function onKeyDown(event){
    var code = event.keyCode ? event.keyCode : event.which;
   
    scene.teclaPulsada(code);
   
}

function onKeyUp(event){
    var code = event.keyCode ? event.keyCode : event.which;

    scene.teclaSoltada(code);
   
}

/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();
  
  
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // listeners
  window.addEventListener ("resize", onWindowResize);
 // window.addEventListener ("mousemove", onMouseMove, true);
  //window.addEventListener ("mousedown", onMouseDown, true);
  //window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox
  window.addEventListener ("keydown", onKeyDown, true);
  window.addEventListener ("keyup", onKeyUp, true);
  
   //Añadir el listener
    MIDI.Player.addListener(function(data)
    {
        //alert("hola");
        scene.senialNota(data.note, data.message);
        
    }); 
    
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
                        MIDI.Player.timeWarp = 1.0;
                        MIDI.Player.BPM=null;
			
		}
	});
  
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
 
  createGUI(true);

  render();
});
