var camera, scene, renderer;
var effect, controls;
var element, container, cover;
var coverActive = true;

var clock = new THREE.Clock();

init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('office');
  container.appendChild(element);

  cover = document.getElementById('cover')
  start = document.getElementById('start')

  start.addEventListener('click', hideCover, false);

  function hideCover() {
    cover.style.display = "none";
    coverActive = false;
    effect = new THREE.StereoEffect(renderer);
    controls.autoRotate = false;
  }

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();

  //sphere
  width = window.innerWidth,
  height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 700);

  camera.position.set(0, 0, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 40);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;


  function setOrientationControls(e) {
    //Will fail on desktop as has no device orientation
    if (!e.alpha || coverActive == true) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }

  window.addEventListener('deviceorientation', setOrientationControls, true);

  var officetexture = THREE.ImageUtils.loadTexture('images/office.jpg');

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(400, 32, 20),
    new THREE.MeshBasicMaterial({
      map: officetexture
    })
  );
  officetexture.minFilter = THREE.LinearFilter;
  officetexture.magFilter = THREE.LinearFilter;
  sphere.scale.x = -1;
  sphere.transparent = false
  scene.add(sphere);

  var info1texture = THREE.ImageUtils.loadTexture('images/info1.png');
  info1texture.minFilter = THREE.LinearFilter;
  info1texture.magFilter = THREE.LinearFilter;
  var info1material = new THREE.SpriteMaterial({
    map: info1texture,
    color: 0xffffff,
    fog: false
  });
  var info2texture = THREE.ImageUtils.loadTexture('images/info2.png');
  info2texture.minFilter = THREE.LinearFilter;
  info2texture.magFilter = THREE.LinearFilter;
  var info2material = new THREE.SpriteMaterial({
    map: info2texture,
    color: 0xffffff,
    fog: false
  });
  var info3texture = THREE.ImageUtils.loadTexture('images/info3.png');
  info3texture.minFilter = THREE.LinearFilter;
  info3texture.magFilter = THREE.LinearFilter;
  var info3material = new THREE.SpriteMaterial({
    map: info3texture,
    color: 0xffffff,
    fog: false
  });
  var info4texture = THREE.ImageUtils.loadTexture('images/info4.png');
  info4texture.minFilter = THREE.LinearFilter;
  info4texture.magFilter = THREE.LinearFilter;
  var info4material = new THREE.SpriteMaterial({
    map: info4texture,
    color: 0xffffff,
    fog: false
  });
  var info5texture = THREE.ImageUtils.loadTexture('images/info5.png');
  info5texture.minFilter = THREE.LinearFilter;
  info5texture.magFilter = THREE.LinearFilter;
  var info5material = new THREE.SpriteMaterial({
    map: info5texture,
    color: 0xffffff,
    fog: false
  });
  var info6texture = THREE.ImageUtils.loadTexture('images/info6.png');
  info6texture.minFilter = THREE.LinearFilter;
  info6texture.magFilter = THREE.LinearFilter;
  var info6material = new THREE.SpriteMaterial({
    map: info6texture,
    color: 0xffffff,
    fog: false
  });
  var info7texture = THREE.ImageUtils.loadTexture('images/info7.png');
  info7texture.minFilter = THREE.LinearFilter;
  info7texture.magFilter = THREE.LinearFilter;
  var info7material = new THREE.SpriteMaterial({
    map: info7texture,
    color: 0xffffff,
    fog: false
  });


  var info1 = new THREE.Sprite(info1material);
  info1.position.set(280, 180, 50);
  info1.scale.set(125, 125, 0); // imageWidth, imageHeight
  info1.transparent = false
  scene.add(info1);

  var info2 = new THREE.Sprite(info2material);
  info2.position.set(200, -50, 150);
  info2.scale.set(90, 90, 0); // imageWidth, imageHeight
  info2.transparent = false
  scene.add(info2);

  var info3 = new THREE.Sprite(info3material);
  info3.position.set(50, 0, 280);
  info3.scale.set(100, 100, 0); // imageWidth, imageHeight
  info3.transparent = false
  scene.add(info3);

  var info4 = new THREE.Sprite(info4material);
  info4.position.set(-160, 100, 240);
  info4.scale.set(105, 105, 0); // imageWidth, imageHeight
  info4.transparent = false
  scene.add(info4);

  var info5 = new THREE.Sprite(info5material);
  info5.position.set(-250, 150, 100);
  info5.scale.set(100, 100, 0); // imageWidth, imageHeight
  info5.transparent = false
  scene.add(info5);

  var info6 = new THREE.Sprite(info6material);
  info6.position.set(-250, 130, -200);
  info6.scale.set(120, 120, 0); // imageWidth, imageHeight
  info6.transparent = false
  scene.add(info6);

  var info7 = new THREE.Sprite(info7material);
  info7.position.set(200, 0, -230);
  info7.scale.set(125, 125, 0); // imageWidth, imageHeight
  info7.transparent = false
  scene.add(info7);

  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);

}


function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}
