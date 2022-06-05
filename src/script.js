import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Models
 */
let scoot
const modelLoader = new GLTFLoader()
const scooter = modelLoader.load('./tier-scooter/source/Scooter.glb',(gltf)=>{
    scoot = gltf.scene
    scene.add(gltf.scene)
    gltf.scene.traverse((mesh)=>{
        mesh.castShadow = true
        mesh.receiveShadow = true
    })
})

/**
 * Debug
 */
const gui = new dat.GUI({closed: true})

const parameters = {
    log:()=>{console.log(camera.position);},
    race:()=>{
        if(scoot != null){
            // scoot.children[4].rotation.y += .2
            // scoot.children[17].rotation.y += .2
            // scoot.children[2].rotation.y += .2
            gsap.to(scoot.children[4].rotation,{x:scoot.children[4].rotation.x + Math.PI *2},)
        }
    }
}
gui.add(parameters,'log')
gui.add(parameters,'race')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Object
 */
// Place
const place = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5,5,1),
    new THREE.MeshStandardMaterial({color:0xffffff})
)
place.rotation.x = 0
place.position.y = -0.01
place.rotation.x = - Math.PI /2
place.receiveShadow = true
scene.add(place)

// Spheres
const sphereGeometry = new THREE.SphereBufferGeometry(0.02,16,16)
const sphereMaterial = new THREE.MeshBasicMaterial()

const sphere1 = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere1.position.set(1.51,1.51,0.39)
const sphere2 = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere2.position.set(-0.9,0.5,0.39)
const sphere3 = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere3.position.set(-0.51,1.51,0)
const sphere4 = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere4.position.set(1.17,0.5,-0.4)
// const sphere5 = new THREE.Mesh(sphereGeometry,sphereMaterial)

const spheres = gui.addFolder("Spheres")
const sphereFolder1 = spheres.addFolder('1')
sphereFolder1.add(sphere1.position,'x').min(-5).max(5).step(0.01)
sphereFolder1.add(sphere1.position,'y').min(-5).max(5).step(0.01)
sphereFolder1.add(sphere1.position,'z').min(-5).max(5).step(0.01)
const sphereFolder2 = spheres.addFolder('2')
sphereFolder2.add(sphere2.position,'x').min(-5).max(5).step(0.01)
sphereFolder2.add(sphere2.position,'y').min(-5).max(5).step(0.01)
sphereFolder2.add(sphere2.position,'z').min(-5).max(5).step(0.01)
const sphereFolder3 = spheres.addFolder('3')
sphereFolder3.add(sphere3.position,'x').min(-5).max(5).step(0.01)
sphereFolder3.add(sphere3.position,'y').min(-5).max(5).step(0.01)
sphereFolder3.add(sphere3.position,'z').min(-5).max(5).step(0.01)
const sphereFolder4 = spheres.addFolder('4')
sphereFolder4.add(sphere4.position,'x').min(-5).max(5).step(0.01)
sphereFolder4.add(sphere4.position,'y').min(-5).max(5).step(0.01)
sphereFolder4.add(sphere4.position,'z').min(-5).max(5).step(0.01)

scene.add(sphere1,sphere2,sphere3,sphere4)

/**
 * Mouse
 */
const mouse = new THREE.Vector2()
window.addEventListener('mousemove',(_event)=>{
    mouse.x = _event.clientX / sizes.width * 2 -1
    mouse.y = - (_event.clientY / sizes.height * 2 -1)
})

// Debug

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,.2)
scene.add(ambientLight)
gui.add(ambientLight,'intensity').min(0).max(2).step(0.01)

const directionalLight = new THREE.DirectionalLight(0xffffff,1.3)
scene.add(directionalLight)
directionalLight.position.x = 4.08
directionalLight.position.y = 2.78
directionalLight.position.z = -3.6
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024,1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.shadow.mapSize.width = 1024 *2
directionalLight.shadow.mapSize.height = 1024 *2
directionalLight.shadow.camera.near = 4.8
directionalLight.shadow.camera.far = 9
directionalLight.shadow.camera.left = -1
directionalLight.shadow.camera.bottom = -.5
directionalLight.shadow.camera.top = 1.5
directionalLight.shadow.camera.right = 1
directionalLight.shadow.radius = 10

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

gui.addColor(directionalLight,'color')
gui.add(directionalLight.position,'x').min(-5).max(5).step(.01)
gui.add(directionalLight.position,'y').min(-5).max(5).step(.01)
gui.add(directionalLight.position,'z').min(-5).max(5).step(.01)
gui.add(directionalLight,'intensity').min(0).max(5).step(.01)
gui.add(directionalLightHelper,'visible')
gui.add(directionalLightCameraHelper, 'visible')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Raycaster
 */
 const raycaster = new THREE.Raycaster()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1.8572868977588266
camera.position.y = 1.9339949462021901
camera.position.z = -0.7003070345268763
camera.lookAt(new THREE.Vector3(0,.5,0))
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false

parameters.go1 = ()=>
{
    gsap.to(camera.position,
        {
            x:1.39,
            y:1.63,
            z:0.33,
            duration:2,
            ease: 'power3.inOut'
        })
    gsap.to(controls.target,
        {
            x:0,
            y:0.7,
            z:0,
            duration:2,
            ease:'power3.inOut'
        })
}
gui.add(parameters,'go1')

parameters.go2 = ()=>
{
    gsap.to(camera.position,
        {
            x:-0.9,
            y:0.56,
            z:0.54,
            duration:2,
            ease: 'power3.inOut'
        })
    gsap.to(controls.target,
        {
            x:0,
            y:0.7,
            z:0,
            duration:2,
            ease:'power3.inOut'
        })
}
gui.add(parameters,'go2')

parameters.go3 = ()=>
{
    gsap.to(camera.position,
        {
            x:-0.07,
            y:1.69,
            z:0.01,
            duration:2,
            ease: 'power3.inOut'
        })
    gsap.to(controls.target,
        {
            x:0.28,
            y:1.5,
            z:0,
            duration:2,
            ease:'power3.inOut'
        })
}
gui.add(parameters,'go3')

parameters.go4 = ()=>
{
    gsap.to(camera.position,
        {
            x:1.18,
            y:0.32,
            z:-0.59,
            duration:2,
            ease: 'power3.inOut'
        })
    gsap.to(controls.target,
        {
            x:0.39,
            y:0.28,
            z:0,
            duration:2,
            ease:'power3.inOut'
        })
}
gui.add(parameters,'go4')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.8
// renderer.setClearColor(0xffffff)


let currentIntersect = null
window.addEventListener('click',()=>
{
    if(currentIntersect != null)
    {
        switch(currentIntersect.object)
        {
            case sphere1:
                parameters.go1()
                break
            case sphere2:
                parameters.go2()
                break
            case sphere3:
                parameters.go3()
                break
            case sphere4:
                parameters.go4()
                break
        }
    }
})



/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Raycaster
    if(scoot!=null)
    {
        const objects = scoot.children
        // if(colors === null)
        // {for(const object of objects)
        // {
        //     if(object.material != null)
        //     colors.push(object.material.color);
        // }
        // console.log(colors);
        // }
        raycaster.setFromCamera(mouse,camera)
        const intersects = raycaster.intersectObjects([sphere1,sphere2,sphere3,sphere4])
        

        if(intersects.length)
        {
            if(currentIntersect === null)
            {
                console.log('mouse enter');
            }
            currentIntersect = intersects[0]
        }
        else
        {
            if(currentIntersect)
            {
                console.log('mouse leave');
            }
            currentIntersect = null
        }
        // if(intersects.length)intersects[0].object.material.color = new THREE.Color(0xff0000);        
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()