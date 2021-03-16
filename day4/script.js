const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10 );
camera.position.set( 0, 0, 2 );



const colorArray = [ new THREE.Color( 0x404E5C ), new THREE.Color( 0xB7C3F3 ), new THREE.Color( 0xDD7596 ),new THREE.Color( 0xCF1259), new THREE.Color(0x4F6272) ];
const positions = [];
const colors = [];

for(let i =0; i < 1000; i ++){
    positions.push(Math.random() - 0.5, (Math.random() - 0.5) , Math.random() - 0.5 )

    const clr = colorArray[Math.floor(Math.random()*colorArray.length) ]

    colors.push( clr.r, clr.g, clr.b )
}


const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    depthTest: true,
    sizeAttenuation: false
})

const mesh = new THREE.Points(geometry,material)
scene.add(mesh)

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

const renderer = new THREE.WebGLRenderer({canvas:canvas, preserveDrawingBuffer: true})

renderer.setSize(sizes.width,sizes.height)
renderer.autoClearColor = false;

let time = Date.now()
let clock = new THREE.Clock()
const tick = () =>
{
        // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    const elapsedTime = clock.getElapsedTime();
    scene.rotation.z = elapsedTime * 0.25;
    scene.rotation.x = elapsedTime * 0.25;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    const elapsedTime = clock.getElapsedTime();

    scene.rotation.y = elapsedTime * 0.5;

    renderer.render( scene, camera );

}

tick()
