function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;

  const image = new Image();
  image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
          gl.TEXTURE_2D,
          level,
          internalFormat,
          srcFormat,
          srcType,
          image
      );

      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
          gl.generateMipmap(gl.TEXTURE_2D); 
      } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
  };
  
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function set_bump_map(gl, texture, texture1) {
  gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(
        gl.TEXTURE_2D,
        texture1
    );
  

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(
        gl.TEXTURE_2D,
        texture
    );
}

function loadTextureEnv(gl) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
   
    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
        url: './resources/imagefiles/stars.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
        url: './resources/imagefiles/stars.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
        url: './resources/imagefiles/stars.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
        url: './resources/imagefiles/stars.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
        url: './resources/imagefiles/stars.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
        url: './resources/imagefiles/stars.jpg',
      },
    ];
  
    faceInfos.forEach((faceInfo) => {
      const {target, url} = faceInfo;
    
      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
    
      const image = new Image();
      image.src = url;
      image.addEventListener('load', function() {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(
          target,
          level,
          internalFormat,
          srcFormat,
          srcType,
          image
        );
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
  
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
}

function set_texture(gl, texture) {
  gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(
        gl.TEXTURE_2D,
        texture
    );
}