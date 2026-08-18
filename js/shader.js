// Laxmi Vastraa - Interactive WebGL Silk Flow Shader
export function initSilkShader(canvasId = 'hero-silk-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  function syncSize() {
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : 700;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  window.addEventListener('resize', syncSize);
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    // Fallback: render luxury CSS gradient
    canvas.style.background = 'radial-gradient(circle at 50% 40%, #71001e 0%, #3b0010 60%, #1a0005 100%)';
    return;
  }

  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 v_texCoord;

    void main() {
      vec2 uv = v_texCoord;
      vec2 mouse = u_mouse / u_resolution;
      
      // Interactive mouse ripple influence
      float distToMouse = distance(uv, mouse);
      float mouseInfluence = smoothstep(0.4, 0.0, distToMouse) * 0.08;
      
      // Flowing silk cloth motion
      float movement = sin(uv.y * 4.5 + u_time * 0.4 + mouseInfluence) * 0.06;
      uv.x += movement;
      
      // Deep Royal Maroon & Old Wine Base (#71001e)
      vec3 color_maroon = vec3(0.443, 0.0, 0.118);
      vec3 color_darker = vec3(0.18, 0.01, 0.05);
      vec3 color_highlight = vec3(0.65, 0.12, 0.22);
      
      // Antique Gold Shimmer highlights (#D4AF37)
      float shimmer1 = pow(max(0.0, sin(uv.x * 9.0 - u_time * 0.8 + uv.y * 4.0)), 12.0) * 0.35;
      float shimmer2 = pow(max(0.0, cos(uv.x * 6.0 + u_time * 0.5 - uv.y * 5.0)), 8.0) * 0.2;
      vec3 gold_shimmer = vec3(0.83, 0.686, 0.215) * (shimmer1 + shimmer2);
      
      // Soft silk drape folds simulation
      float folds = sin(uv.x * 7.0 + u_time * 0.25) * 0.5 + 0.5;
      float folds2 = cos(uv.y * 5.0 - u_time * 0.3) * 0.3 + 0.7;
      
      vec3 final_color = mix(color_darker, color_maroon, folds * folds2);
      final_color = mix(final_color, color_highlight, pow(folds, 3.0) * 0.4);
      final_color += gold_shimmer;
      
      // Subtle elegant vignette
      float vignette = 1.0 - length(uv - 0.5) * 0.95;
      final_color *= max(0.5, vignette);
      
      gl_FragColor = vec4(final_color, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  const onMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = rect.height - (e.clientY - rect.top);
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  let startTime = performance.now();
  let animationFrameId;

  function render(now) {
    syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const elapsedTime = (now - startTime) * 0.001;
    gl.uniform1f(timeLocation, elapsedTime);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrameId = requestAnimationFrame(render);
  }

  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', syncSize);
  };
}
