var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
var controls = new THREE.TrackballControls(camera, renderer.domElement);
var modelObject;

// Set up renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a black background
scene.background = new THREE.Color(0x000000);

// Circle
var circleGeometry = new THREE.CylinderGeometry(10, 10, 15, 32); // Increase the height to give it more volume
var circleMaterial = new THREE.MeshPhongMaterial({ color: 0xcd7f32 }); // Bronze color for the circle
var circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.set(-50, 0, 0); // Adjust the position
scene.add(circle);

// Box
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial({ color: 0xFFD700 }); // Gold color for the box
var cube = new THREE.Mesh(geometry, material);
cube.position.set(50, 0, 0);
scene.add(cube);
cube.scale.set(15, 15, 15); // Use set() method to set scale

// Adjust camera position
camera.position.set(0, 0, 100);

// Create text (I used ChatGPT here for help)
var loader = new THREE.FontLoader();
loader.load('fonts/gentilis_bold.typeface.json', function(font) {
    // Create text geometry with the loaded font
    var textGeometry = new THREE.TextGeometry('Week 14!', {
      font: font,
      size: 10,
      height: 1
    });
  
    var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }); // Use MeshPhongMaterial for shadow
    var text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(-50, -window.innerHeight / 8 + 40, 10); // Move text to the bottom of the screen
    scene.add(text);
  
    // Add shadow to the text
    text.castShadow = true;
    text.receiveShadow = true;
  
    // Animation
    var clock = new THREE.Clock();
    var speed = 0.02; // Adjust speed as needed
    
    // Animate the text
    function animateText() {
      var delta = clock.getDelta();
      
      // Rotate the text
      text.rotation.y += speed * delta;
      
      requestAnimationFrame(animateText);
    }
  
    animateText();
  });
  
// Lighting
function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

// Control Set up
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

// Circle and Box Set up
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01; // Adjust rotation speed as needed
  cube.rotation.y += 0.01; // Adjust rotation speed as needed
  circle.rotation.x += 0.02; // Adjust rotation speed as needed
  circle.rotation.y += 0.02; // Adjust rotation speed as needed
  renderer.render(scene, camera);
}

// Model Loading
function loadModel() {
  loader = new THREE.OBJLoader();
  loader.load('models/tinker.obj', function (object) {
    object.rotation.z = Math.PI;
    modelObject = object;
    scene.add(object);
    animateModel();
  });
}

function animateModel() {
  requestAnimationFrame(animateModel);
  // Slow down the rotation of the loaded model
  modelObject.rotation.x += 0.03; // Adjust the increment value as needed
  modelObject.rotation.y += 0.03; // Adjust the increment value as needed
}

// Rendering 
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var light = getLight(scene);

loadModel();

animate();

render();
