

var stats, scene, renderer, composer;
var camera, cameraControls;
const objectsToUpdate = []

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

var Variables = function(){
    this.speed = 1.0
}
var variables = new Variables();

var gui = new dat.GUI();
gui.add(variables, 'speed', 0, 2)



const debugObject = {}

debugObject.createSphere = () =>
{
    createSphere(0.5, {
        x:(Math.random() - 0.5)*3,
        y:3,
        z:(Math.random() - 0.5)*3
    })
}
gui.add(debugObject,'createSphere')
debugObject.createBox = () =>
{
    createBox(0.5,0.5,0.5, {
        x:(Math.random() - 0.5)*3,
        y:3,
        z:(Math.random() - 0.5)*3
    })
}
gui.add(debugObject, 'createBox')



    const world = new CANNON.World()





    renderer = new THREE.WebGLRenderer({
        antialias		: true,	// to get smoother output
    });
    renderer.setClearColor( 0xBADA55 );

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // add Stats.js - https://github.com/mrdoob/stats.js
    stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.bottom	= '0px';
    document.body.appendChild( stats.domElement );

    // create a scene
    scene = new THREE.Scene();

    // put a camera in the scene
    camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 5);
    scene.add(camera);
    
 camera.position.z = 30
 camera.position.y = 0
 camera.position.x = 0
 

    // create a camera contol
    //cameraControls	= new THREE.OrbitControls( camera,  renderer.domElement  )


    //Physics
    // //World
    
    world.gravity.set(0,-9.82,0)

    // //Cannon Materials
    const defaultMaterial = new CANNON.Material('default')
    // //our default material's properties
    const defaultContactMateral = new CANNON.ContactMaterial(defaultMaterial,defaultMaterial,{friction:0.1,restitution:1})
    world.addContactMaterial(defaultContactMateral)
    world.defaultContactMateral = defaultMaterial

    // Objects
     window.addEventListener('resize', ()=>
     {
     sizes.width = window.innerWidth
     sizes.height = window.innerHeight

     camera.aspect = sizes.width/sizes.height
     camera.updateProjectionMatrix()
     renderer.setSize(sizes.width,sizes.height)
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
 })

 // /**
//  * Lights
//  */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)
 
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.camera.left = - 7
  directionalLight.shadow.camera.top = 7
  directionalLight.shadow.camera.right = 7
  directionalLight.shadow.camera.bottom = - 7
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

 const wallGeometry = new THREE.BoxGeometry(1,1,1)
 const wallMaterial = new THREE.MeshNormalMaterial()
 const createWall = (width,height,depth,position) =>
 {
     const mesh = new THREE.Mesh(wallGeometry,wallMaterial)
     mesh.position.copy(position)
     mesh.scale.set(width,height,depth)
     scene.add(mesh)

     //divide by 2 because we want to start at the center of the box
const shape = new CANNON.Box(new CANNON.Vec3(width *  0.5, height *  0.5, depth *  0.5))
const body = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0,3,0),
    shape: shape,
    material: defaultMaterial
})
body.position.copy(position)
world.addBody(body)

    // Save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
 }
 createWall(10,15,0.5,{x:0,y:0,z:0})
 createWall(10,0.5,5,{x:0,y:-2.5,z:2.5})
 createWall(0.5,15.25,5.25,{x:5,y:-.25/2,z:2.38})
 createWall(0.5,15.25,5.25,{x:-5,y:-.25/2,z:2.38})





// Sphere
const sphereGeometry = new THREE.SphereGeometry(1,20,20)
const sphereMaterial = new THREE.MeshNormalMaterial()

 const createSphere = (radius, position) =>
{
    const mesh = new THREE.Mesh(sphereGeometry,sphereMaterial)
    mesh.castShadow = true
    mesh.position.copy(position)
    mesh.scale.set(radius,radius,radius)
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    // Save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

createSphere(0.5, {x:0, y:3, z: 1})


 // Box

const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxMaterial = new THREE.MeshNormalMaterial()

const createBox = (width,height,depth, position) =>
{
    const mesh = new THREE.Mesh(boxGeometry,boxMaterial)
    mesh.castShadow = true
    mesh.position.copy(position)
    mesh.scale.set(width,height,depth)
    scene.add(mesh)


    // Cannon.js body

    //divide by 2 because we want to start at the center of the box
    const shape = new CANNON.Box(new CANNON.Vec3(width *  0.5, height *  0.5, depth *  0.5))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    // Save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}




window.addEventListener('click', () =>
{
    createSphere(
        (Math.random() * 0.5)+ 0.1,
         {
        x:(Math.random() - 0.5)*3,
        y:3,
        z:1
        }
    )
})

window.addEventListener('touchstart', () =>
{
    createSphere(
        (Math.random() * 0.5)+ 0.1,
         {
        x:(Math.random() - 0.5)*3,
        y:3,
        z:1
        }
    )
})
window.addEventListener('keyup', (e) =>
{
    if(e.code === 'Space')
        createBox(1,1,1, {x:Math.random() * 3 , y:3, z: 1})
    
})



    




/**
 * Animate
 */
 const clock = new THREE.Clock()
 let oldElapsedTime = 0
 
 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
     const deltaTime = elapsedTime - oldElapsedTime
     oldElapsedTime = elapsedTime
     //update physics world
     //sphereBody.applyForce(new CANNON.Vec3(-0.5,0,0), sphereBody.position)
 
     world.step(1 / 60, deltaTime , 3)
 
     // Loop through objectsToUpdate array
     // Update mesh positions according to body positions
     for(const object of objectsToUpdate)
     {
         object.mesh.position.copy(object.body.position)
         object.mesh.quaternion.copy(object.body.quaternion)
 
     }
 
     //sphere.position.copy(sphereBody.position)
     // or we would have to do this
     // sphere.position.x = sphereBody.position.x
     // sphere.position.y = sphereBody.position.y
     // sphere.position.z = sphereBody.position.z
 
 
 
     // Update controls
     //controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()