/**
 * Sphere 3D — Network Globe Animation (v3)
 * - Esfera completamente visible (sin recorte)
 * - Movimiento flotante orbital dentro del hero
 * - Hover: acelera + breathing + cyan glow
 * - Mouse parallax suave
 */
(function () {
  'use strict';

  // ── Esperar a que Three.js cargue ──────────────────────────────────────
  function waitForThree(attempts) {
    if (attempts <= 0) { console.error('[Sphere3D] Three.js no cargó.'); return; }
    if (!window.THREE) {
      setTimeout(function () { waitForThree(attempts - 1); }, 200);
      return;
    }
    initSphere();
  }

  function initSphere() {
    var THREE = window.THREE;

    // ── Selección del hero ────────────────────────────────────────────────
    var heroSection = document.querySelector('main section') ||
                      document.querySelector('section');
    if (!heroSection) { console.error('[Sphere3D] Hero no encontrado.'); return; }

    // ── Canvas sobre el hero completo ─────────────────────────────────────
    var canvas = document.createElement('canvas');
    canvas.id  = 'sphere-canvas';
    Object.assign(canvas.style, {
      position:      'absolute',
      top:           '0',
      left:          '0',
      width:         '100%',
      height:        '100%',
      zIndex:        '1',
      pointerEvents: 'none',
      display:       'block',
    });
    heroSection.insertBefore(canvas, heroSection.firstChild);

    // ── Three.js renderer ─────────────────────────────────────────────────
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // ── Fibonacci sphere ──────────────────────────────────────────────────
    var N      = 480;
    var RADIUS = 1.9;     // ligeramente más pequeña para que entre completa
    var THRESH = RADIUS * 0.68;

    function fibSphere(n, r) {
      var pts    = [];
      var golden = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < n; i++) {
        var y   = 1 - (i / (n - 1)) * 2;
        var rad = Math.sqrt(Math.max(0, 1 - y * y));
        var th  = golden * i;
        pts.push(new THREE.Vector3(
          Math.cos(th) * rad * r,
          y * r,
          Math.sin(th) * rad * r
        ));
      }
      return pts;
    }

    var pts = fibSphere(N, RADIUS);

    // ── LineSegments (conexiones) ─────────────────────────────────────────
    var lineVerts = [];
    for (var i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        if (pts[i].distanceTo(pts[j]) < THRESH) {
          lineVerts.push(
            pts[i].x, pts[i].y, pts[i].z,
            pts[j].x, pts[j].y, pts[j].z
          );
        }
      }
    }

    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    var lineMat = new THREE.LineBasicMaterial({
      color:       0x4499ff,
      transparent: true,
      opacity:     0.22,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    });
    var lineSegs = new THREE.LineSegments(lineGeo, lineMat);

    // ── Puntos/nodos con shader ───────────────────────────────────────────
    var ptPos = new Float32Array(N * 3);
    pts.forEach(function (p, i) {
      ptPos[i * 3]     = p.x;
      ptPos[i * 3 + 1] = p.y;
      ptPos[i * 3 + 2] = p.z;
    });

    var ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(ptPos, 3));

    var ptMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
        uTime:       { value: 0.0 },
        uHover:      { value: 0.0 },
      },
      vertexShader: [
        'uniform float uPixelRatio;',
        'uniform float uTime;',
        'uniform float uHover;',
        'void main() {',
        '  vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);',
        '  float hash  = sin(position.x * 12.9898 + position.y * 78.233 + position.z * 43.1);',
        '  float freq  = 2.0 + hash * 1.5;',
        '  float twink = 1.0 + 0.35 * sin(uTime * freq + hash * 6.28);',
        '  float boost = 1.0 + uHover * 0.55;',
        '  gl_PointSize = 3.5 * uPixelRatio * twink * boost;',
        '  gl_Position  = projectionMatrix * mvPos;',
        '}',
      ].join('\n'),
      fragmentShader: [
        'uniform float uHover;',
        'void main() {',
        '  float d = length(gl_PointCoord - vec2(0.5));',
        '  if (d > 0.5) discard;',
        '  float a = pow(1.0 - smoothstep(0.05, 0.5, d), 1.4);',
        '  vec3 col = mix(vec3(0.35, 0.60, 1.0), vec3(0.25, 0.85, 1.0), uHover);',
        '  gl_FragColor = vec4(col, a * 0.95);',
        '}',
      ].join('\n'),
    });

    var ptMesh = new THREE.Points(ptGeo, ptMat);

    // ── Glow interno ──────────────────────────────────────────────────────
    var glowGeo  = new THREE.SphereGeometry(RADIUS * 0.55, 24, 24);
    var glowMat  = new THREE.MeshBasicMaterial({
      color:       0x2244bb,
      transparent: true,
      opacity:     0.05,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });
    var glowMesh = new THREE.Mesh(glowGeo, glowMat);

    // ── Grupo principal ───────────────────────────────────────────────────
    var group = new THREE.Group();
    group.add(lineSegs, ptMesh, glowMesh);
    scene.add(group);

    // ── Posición base: derecha en desktop, centro en móvil ────────────────
    var baseX = 0;
    function updateBaseX() {
      baseX = (heroSection.clientWidth > 768) ? 1.8 : 0;
    }

    // ── Estado mouse ──────────────────────────────────────────────────────
    var mouse  = { x: 0, y: 0, hovered: false };
    var hoverT = 0;
    var rotSpd = 0.0015;

    heroSection.addEventListener('mouseenter', function () { mouse.hovered = true;  });
    heroSection.addEventListener('mouseleave', function () { mouse.hovered = false; });
    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ── Resize ────────────────────────────────────────────────────────────
    function resize() {
      var w = heroSection.clientWidth  || window.innerWidth;
      var h = heroSection.clientHeight || 500;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updateBaseX();
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Animación ─────────────────────────────────────────────────────────
    var t0      = performance.now();
    var frameId;

    function animate(now) {
      frameId = requestAnimationFrame(animate);
      var t = (now - t0) * 0.001;

      ptMat.uniforms.uTime.value = t;

      // Hover lerp
      hoverT += ((mouse.hovered ? 1 : 0) - hoverT) * 0.05;
      ptMat.uniforms.uHover.value = hoverT;
      lineMat.opacity  = 0.22 + hoverT * 0.20;
      glowMat.opacity  = 0.05 + hoverT * 0.08;

      // ── Movimiento flotante orbital ──────────────────────────────────
      // Órbita suave: la esfera se mueve en una elipse alrededor de su posición base
      var floatX = Math.sin(t * 0.45) * 0.35;          // deriva horizontal
      var floatY = Math.sin(t * 0.70) * 0.30;          // flotación vertical
      var floatZ = Math.cos(t * 0.35) * 0.20;          // profundidad sutil

      group.position.x = baseX + floatX + mouse.x * 0.12;
      group.position.y = floatY       - mouse.y * 0.08;
      group.position.z = floatZ;

      // Rotación continua (acelera en hover)
      var targetSpd = 0.0015 + hoverT * 0.010;
      rotSpd += (targetSpd - rotSpd) * 0.06;
      group.rotation.y += rotSpd;

      // Wobble suave en X
      group.rotation.x = Math.sin(t * 0.22) * 0.08;
      group.rotation.z = Math.sin(t * 0.18) * 0.04;

      // Breathing en hover
      var breath = 1.0 + hoverT * 0.04 * Math.sin(t * 3.2);
      group.scale.setScalar(breath);

      renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);

    // ── Pausa fuera de pantalla ───────────────────────────────────────────
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) requestAnimationFrame(animate);
          else cancelAnimationFrame(frameId);
        });
      }, { threshold: 0.05 }).observe(heroSection);
    }
  }

  // ── Arrancar ──────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { waitForThree(15); });
  } else {
    waitForThree(15);
  }

})();
