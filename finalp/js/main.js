var gl = null;
var myShader = null;
var myDrawable = null;
var myDrawables = [];
var myDrawableInitialized = null;
var modelViewMatrix = null;
var projectionMatrix = null;
var globalTime = 0.0;
var parsedData = null;

let r = 0;
let lightPos = [0.0, 8.0, 0.0];
let pos = null;
let pyr_texture = null;
let pyr_texture1 = null;
let ground_texture = null;
let skyColor = [0.70, 0.85, 1.0, 1.0];
let fog = {
  near: 2.0,
  far: 8.0,
};
let worldViewMatrix = null;


function main() {
  const canvas = document.getElementById('glCanvas');
  // Initialize the GL context
  gl = canvas.getContext('webgl2');

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert('Unable to initialize WebGL2. Contact the TA.');
    return;
  }

  // Set clear color to whatever color this is and fully opaque
  gl.clearColor(...skyColor);
  // Clear the depth buffer
  gl.clearDepth(1.0);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.DEPTH_TEST);

  let then = 0.0;
  function render(now) {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    drawScene(deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const FOV = degreesToRadians(60);
  const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar  = 100.0;
  projectionMatrix = glMatrix.mat4.create();
  glMatrix.mat4.perspective(projectionMatrix,
                   FOV,
                   aspectRatio,
                   zNear,
                   zFar);

  // Setup Controls
  setupUI();
  setupScene();
}

function setupUI() {
  let sliders = ['cam', 'look'];
  let dims = ['X', 'Y', 'Z'];
  
  sliders.forEach(controlType => {
    dims.forEach(dimension => {
      let slideID = `${controlType}${dimension}`;
      console.log(`Setting up control for ${slideID}`);
      let slider = document.getElementById(slideID);
      let sliderVal = document.getElementById(`${slideID}Val`);

      slider.oninput = () => {
        let newVal = slider.value;
        sliderVal.value = newVal;
      };
      sliderVal.oninput = () => {
        let newVal = sliderVal.value;
        slider.value = newVal;
      };
    });
  });
}

// Async as it loads resources over the network.
async function setupScene() {
  let ufo_objData = await loadNetworkResourceAsText('resources/models/ufo.obj');
  let ufo_vertSource = await loadNetworkResourceAsText('resources/shaders/verts/env.vert');
  let ufo_fragSource = await loadNetworkResourceAsText('resources/shaders/frags/env.frag');

  pos = [0.0, 0.0, 0.0];
  initializeMyObject(
    ufo_vertSource,
    ufo_fragSource,
    ufo_objData,
    pos,
    "ufo"
  );

  let pyr_objData = await loadNetworkResourceAsText('resources/models/pyramid.obj');
  let pyr_vertSource = await loadNetworkResourceAsText('resources/shaders/verts/norm.vert');
  let pyr_fragSource = await loadNetworkResourceAsText('resources/shaders/frags/norm.frag');

  pyr_texture = loadTexture(gl, "./resources/imagefiles/marble.jpg");
  pyr_texture1 = loadTexture(gl, "./resources/imagefiles/bricknorm5.jpg");

  pos = [0.0, 0.0, 0.0];
  initializeMyObject(
    pyr_vertSource,
    pyr_fragSource,
    pyr_objData,
    pos,
    "pyr"
  );

  let ground_objData = await loadNetworkResourceAsText('resources/models/ground2.obj');
  let ground_vertSource = await loadNetworkResourceAsText('resources/shaders/verts/phong.vert');
  let ground_fragSource = await loadNetworkResourceAsText('resources/shaders/frags/phong.frag');

  ground_texture = loadTexture(gl, "./resources/imagefiles/sand_text.jpg");

  pos = [0.0, 0.0, 0.0];
  initializeMyObject(
    ground_vertSource,
    ground_fragSource,
    ground_objData,
    pos,
    "ground"
  );
}

function drawScene(deltaTime) {
  globalTime += deltaTime;

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  let viewMatrix = glMatrix.mat4.create();

  let cam_x = document.getElementById("camX").value;
  let cam_y = document.getElementById("camY").value;
  let cam_z = document.getElementById("camZ").value;
  
  let cameraPos = [cam_x, cam_y, cam_z];
  
  let focus_x = document.getElementById("lookX").value;
  let focus_y = document.getElementById("lookY").value;
  let focus_z = document.getElementById("lookZ").value;
  
  let cameraFocus = [focus_x, focus_y, focus_z];
  glMatrix.mat4.lookAt(viewMatrix,
                       cameraPos,
                       cameraFocus,
                       [0.0, 1.0, 0.0]
                      );
  worldViewMatrix = glMatrix.mat4.create();
  worldViewMatrix = glMatrix.mat4.mul(worldViewMatrix, worldViewMatrix, viewMatrix);
  if (worldViewMatrix === viewMatrix) console.log(true);

  modelViewMatrix = glMatrix.mat4.create();

  myDrawables.forEach((obj) => {
    obj.uniformSetup = () => {
      gl.uniformMatrix4fv(
        obj.uniformLocations.uProjectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        obj.uniformLocations.uModelViewMatrix,
        false,
        modelViewMatrix
      );
      gl.uniform1i(
        obj.uniformLocations.tex_norm,
        0
      );
      gl.uniform1i(
        obj.uniformLocations.tex_diffuse,
        1
      );
      gl.uniform3fv(obj.uniformLocations.uLightPos, lightPos);
      gl.uniform1f(obj.uniformLocations.uFogNear, fog.near);
      gl.uniform1f(obj.uniformLocations.uFogFar, fog.far);
      gl.uniform4fv(obj.uniformLocations.uFogColor, skyColor);
      gl.uniformMatrix4fv(
        myDrawable.uniformLocations.uWorldViewMatrix,
        false,
        worldViewMatrix
      );
    };

    if (obj.obj == "pyr") {
      set_bump_map(gl, pyr_texture, pyr_texture1);
    } else if (obj.obj == "ground") {
      set_texture(gl, ground_texture);
    }
    
    let modelMatrix = glMatrix.mat4.create();
    let objectWorldPos = [obj.pos[0], obj.pos[1], obj.pos[2]];
    let rotationAxis = [0.0, r, 0.0];
  
    glMatrix.mat4.translate(modelMatrix, modelMatrix, objectWorldPos);
    glMatrix.mat4.rotate(modelMatrix,
                         modelMatrix,
                         globalTime * 1.25,
                         rotationAxis
                        );

    glMatrix.mat4.mul(modelViewMatrix, viewMatrix, modelMatrix);

    if (myDrawableInitialized){
      obj.draw();
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
  });
}

function initializeMyObject(vertSource, fragSource, objData, pos, obj) {
  myShader = new ShaderProgram(vertSource, fragSource);
  parsedData = new OBJData(objData);
  let rawData = parsedData.getFlattenedDataFromModelAtIndex(0);

  let vertexPositionBuffer = new VertexArrayData(
    rawData.vertices,
    gl.FLOAT,
    3
  );
  
  let vertexNormalBuffer = new VertexArrayData(
    rawData.normals,
    gl.FLOAT,
    3
  );
  let vertexTexCoordBuffer = new VertexArrayData (
    rawData.uvs,
    gl.FLOAT,
    2
  );
  let vertexBarycentricBuffer = new VertexArrayData (
    rawData.barycentricCoords,
    gl.FLOAT,
    3
  );

  let bufferMap = {
    'aVertexPosition': vertexPositionBuffer,
    'aBarycentricCoord': vertexBarycentricBuffer,
    'aVertexNormal': vertexNormalBuffer,
    'aVertexTexCoord': vertexTexCoordBuffer
  };

  myDrawable = new Drawable(myShader, bufferMap, null, rawData.vertices.length / 3);

  myDrawable.uniformLocations = myShader.getUniformLocations(['uModelViewMatrix', 'uProjectionMatrix', 'tex_norm', 'tex_diffuse', 'uLightPos', 'uFogNear', 'uFogFar', 'uFogColor', 'worldViewMatrix']);
  myDrawable.uniformSetup = () => {
    gl.uniformMatrix4fv(
      myDrawable.uniformLocations.uProjectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      myDrawable.uniformLocations.uModelViewMatrix,
      false,
      modelViewMatrix
    );
    gl.uniform1i(
      myDrawable.uniformLocations.tex_norm,
      0
    );
    gl.uniform1i(
      myDrawable.uniformLocations.tex_diffuse,
      1
    );
    gl.uniform3fv(
      myDrawable.uniformLocations.uLightPos,
      lightPos
    );
    gl.uniform1f(myDrawable.uniformLocations.uFogNear, fog.near);
    gl.uniform1f(myDrawable.uniformLocations.uFogFar, fog.far);
    gl.uniform4fv(obj.uniformLocations.uFogColor, skyColor);
    gl.uniformMatrix4fv(
      myDrawable.uniformLocations.uWorldViewMatrix,
      false,
      worldViewMatrix
    );
  };

  myDrawable.pos = pos;
  myDrawable.obj = obj;
  myDrawables.push(myDrawable);

  if (obj == "ufo") loadTextureEnv(gl);

  myDrawableInitialized = true;
}

function rotate() {
  r = r ^ 1;
}

window.onload = main;