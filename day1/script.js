const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xff00000 );


const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/day1/matcaps/8.png')

const material = new THREE.MeshNormalMaterial()

const geometry = new THREE.BoxGeometry(1,1,1)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.y = 1.5
const mesh2 = new THREE.Mesh(geometry, material)
scene.add(mesh2)
mesh2.position.y = 1.5
mesh2.position.x = - 2

const mesh3 = new THREE.Mesh(geometry, material)
scene.add(mesh3)
mesh3.position.y = 1.5
mesh3.position.x = 2
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
scene.add(camera)

camera.position.z = 4


const mesh6 = new THREE.Mesh(geometry, material)
scene.add(mesh6)
mesh6.position.y = -1.5
const mesh4 = new THREE.Mesh(geometry, material)
scene.add(mesh4)
mesh4.position.y = -1.5
mesh4.position.x = - 2

const mesh5 = new THREE.Mesh(geometry, material)
scene.add(mesh5)
mesh5.position.y = -1.5
mesh5.position.x = 2

window.addEventListener('resize', ()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})


const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({canvas:canvas,alpha:true})

renderer.setSize(sizes.width,sizes.height)


let time = Date.now()

const tick = () =>
{
        // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.x += 0.005 * deltaTime/2
    mesh2.rotation.y -= 0.005 * deltaTime/2
    mesh3.rotation.y += 0.005 * deltaTime/2

    mesh6.rotation.x -= 0.005 * deltaTime/2
    mesh4.rotation.y -= 0.005 * deltaTime/2
    mesh5.rotation.y += 0.005 * deltaTime/2

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
