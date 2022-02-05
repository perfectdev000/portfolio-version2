import React from 'react';
import Head from 'next/head'
import * as THREE from "three";

import Header from '../components/header/Header';
import Developer from "../components/Developer"

class About extends React.Component<{}> { 
  componentDidMount(){
    let container:any;    
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    // camera.position.set(0,30,30)
    let envMapURLs = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];
    
    let reflectionCube = new THREE.CubeTextureLoader().
    setCrossOrigin('').
    setPath('assets/img/landing-page/').
    load(envMapURLs);
    reflectionCube.format = THREE.RGBFormat;
    reflectionCube.mapping = THREE.CubeRefractionMapping;

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    let middle = new THREE.Vector3();

    renderer.setClearColor(0x000000);
    renderer.setSize(innerWidth, innerHeight);
    container = document.getElementById( 'about-canvas-container' );
    container.appendChild(renderer.domElement);
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update()
    scene.background = reflectionCube;

    let light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set(100, 200, 200);
    scene.add(light)

    light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set(100, 200, -200);
    scene.add(light);

    light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set( -40, 50, 30);
    scene.add(light);

    let geometry = new THREE.BoxGeometry(5, 5, 0.04);
    let material = new THREE.MeshStandardMaterial({ color: 0x9999aa, roughness: 0.5, metalness: 0.3, envMap: reflectionCube });

    let cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];
    let cubeCount = 300;
    for (let i = 0; i < cubeCount; i++) {
      let cube = new THREE.Mesh(geometry, material);
      // let t = i / cubeCount * Math.PI * 2;
      // cube.t = t;
      cube.rotation.set(0, 0, i*0.003);
      scene.add(cube);
      cubes.push(cube);
    }

    function draw() {
      requestAnimationFrame(draw);
      let time = Date.now() * 0.005;
      cubes.forEach((cube, index) => {
        cube.rotation.z -= 0.004;
        cube.position.set(0, 0, -7 + index*0.04 );    
      });
      
      camera.position.set( -4, 0.5, 3);      
      camera.lookAt(middle);
      renderer.render(scene, camera);
    }

    draw();

    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }, false);
  }

  render(){
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main className='flex items-center justify-center w-[100vw] h-[100vh] cursor-default absolute top-0 left-0 p-4'>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='hidden md:block '>
                <div className='w-full h-full md:pl-20 flex items-center justify-center'>              
                  <Developer/>
                </div>
              </div>
              <div className='w-full h-full flex items-center justify-center md:pr-20'>
                <div className='text-white text-12 md:text-lg font-medium '>
                  <div className='text-28 md:text-36 pt-4 pb-6 font-semibold text-white'>Who am I?</div>
                  <div className='text-18 md:text-22 mb-1'>Hi there</div>
                  I&apos;m PiDong, an experienced professional developer in China.<br/>
                  I have been working in web and mobile development for 10+ years.<br/>
                  My projects include building UI for web and mobile, web 3D &amp; 2D animation, backend implementation, 3rd party API integration, web crawling, and more.<br/>
                  <div className='h-3'></div>
                  The things I love:<br/>
                  &nbsp;&nbsp;- Learning New Skill, Updating Myself<br/>
                  &nbsp;&nbsp;- JavaScript, TypeScript, Python, 3D animation<br/>
                  &nbsp;&nbsp;- Build Trust and Build Long-Term Relationship<br/>
                  &nbsp;&nbsp;- Movies, Games, Billiards, Gardening<br/>
                  <div className='h-3'></div>
                  The things I hate:<br/>
                  &nbsp;&nbsp;- Dirty Code<br/>
                  &nbsp;&nbsp;- Stopping Task Without Completing<br/>
                  <div className='h-3'></div>
                  I am ready to start a new project, so feel free to ping me.<br/>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <div id='about-canvas-container' className='absolute w-full h-full top-0 left-0' style={{zIndex:'-100'}}></div>
        <Header />
      </>
    );
  }
}

export default About;