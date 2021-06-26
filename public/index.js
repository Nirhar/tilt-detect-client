// const ip='localhost'
// const port='3000'

const ip='192.168.1.10'
const port='80'

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


    var request=new Request(`http://${ip}:${port}/get_angles`,{
        mode:'cors'
    })

    var resp = await fetch(request).then(response=>{
        // console.log(response.text())
        return response.text();
    }).catch(error=>{
        console.error(error);
    })
    resp = JSON.parse(resp);
    console.log(resp);
    cube.rotation.x = resp.roll*(3.1416/180);
    // // cube.rotation.y = resp.y;
    cube.rotation.z = resp.pitch*(3.1416/180);

    // cube.rotation.z = 3.14/2;

    renderer.render(scene, camera);
};

animate();