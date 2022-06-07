const h_scr = window.innerWidth;
const v_scr = window.innerHeight; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, h_scr/v_scr, 0.1, 1000);
camera.position.set(0, 0, 30);
camera.lookAt(0,-3,0)

const renderer = new THREE.WebGLRenderer({canvas: HelloCanvas}); 
renderer.setSize( h_scr, v_scr ); 
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const geometry = new THREE.SphereGeometry(1, 8, 8);
const material1 = new THREE.MeshPhongMaterial( { 
		color: 0xff0000, shininess : 90.0 });

const light1 = new THREE.DirectionalLight(0xffffffff, 1.0, 1000, 1); 
light1.position.set (3,5,0); 
scene.add( light1 ); 
light1.castShadow = true; // default false

light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default

/*
const light2 = new THREE.DirectionalLight(0xffffffff, 1.0, 1000, 1); 
light2.position.set (-5,5,0); 
scene.add( light2 ); 
light2.castShadow = true; // default false

light2.shadow.mapSize.width = 512; // default
light2.shadow.mapSize.height = 512; // default
light2.shadow.camera.near = 0.5; // default
light2.shadow.camera.far = 500; // default
*/

const sphere = new THREE.Mesh( geometry, material1 );
sphere.castShadow = true; //default is false
sphere.receiveShadow = true;

const geometry1 = new THREE.PlaneGeometry( 10, 10, 1 );
const material = new THREE.MeshLambertMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry1, material );
scene.add( plane );

/*
const geometry2 = new THREE.BoxGeometry( 1, 10, 1 );
const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry2, material2 );
scene.add( cube );
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.x = 4;
*/

plane.rotation.set(90, 0, 0)
plane.position.y = -3;
plane.receiveShadow = true;

scene.add(sphere); 
const helper = new THREE.CameraHelper( light1.shadow.camera );
scene.add( helper );

var rot = 0.0;
var move = 0;
var flag = 0;

const animate = function () {
	requestAnimationFrame( animate );

	rot += 0.01;
	sphere.rotation.y = rot;
    
	if(flag == 0){
		move += 0.01;
	}
	if(flag == 1){
		move -= 0.01;
	}

	if(move > 5.0){
		flag = 1;
	}
	if(move < -5.0){
		flag = 0;
	}

	light1.position.x = move;
	

	renderer.render( scene, camera );
};
animate();
