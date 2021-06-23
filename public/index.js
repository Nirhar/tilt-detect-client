const ip='localhost'
const port='3000'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(3, 0.5, 2);
const material = new THREE.MeshToonMaterial({ color: 0xff00ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// // White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
scene.add( directionalLight );

camera.position.z = 5;
directionalLight.position.y = 5;

const animate = async function () {
    requestAnimationFrame(animate);


    var request=new Request(`http://${ip}:${port}/get_new_angle`,{
        mode:'cors'
    })

    var resp = await fetch(request).then(response=>{
        return response.json();
    }).catch(error=>{
        console.error(error);
    })
    // console.log(resp);
    cube.rotation.x = resp.x;
    cube.rotation.y = resp.y;

    renderer.render(scene, camera);
};

animate();