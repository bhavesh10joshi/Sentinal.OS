import { useEffect, useRef } from 'react'

interface WebGLShaderProps {
  className?: string
  opacity?: number
}

// WebGL grid shader — animated cyber-grid background matching Aegis Core global background shader
export function WebGLShader({ className = '', opacity = 0.25 }: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Sync canvas resolution to CSS size
    const syncSize = () => {
      canvas.width = canvas.clientWidth || window.innerWidth
      canvas.height = canvas.clientHeight || window.innerHeight
    }
    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null
    if (!gl) return

    // Vertex shader — full-screen quad
    const vertSrc = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `

    // Fragment shader — animated cyber grid with scanlines
    const fragSrc = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_res;

      float grid(vec2 uv, float res) {
        vec2 g = fract(uv * res);
        return step(0.97, g.x) + step(0.97, g.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        float t = u_time * 0.18;

        // Deep atmospheric base
        vec3 col = vec3(0.98, 0.97, 0.997);

        // Primary fine grid (moves horizontally)
        float g1 = grid(uv + vec2(t * 0.08, 0.0), 25.0);
        // Secondary coarse grid (moves vertically)
        float g2 = grid(uv - vec2(0.0, t * 0.04), 10.0);

        // Blue primary tint for grid lines
        col -= vec3(0.0, 0.22, 0.44) * g1 * 0.06;
        col -= vec3(0.0, 0.22, 0.44) * g2 * 0.03;

        // Soft scanline
        float scan = sin(uv.y * 600.0 + u_time * 8.0) * 0.008;
        col -= scan;

        // Subtle vignette toward edges
        float vig = 1.0 - length(uv - 0.5) * 0.5;
        col *= vig;

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `

    // Compile shader helper
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')

    const start = performance.now()

    const render = () => {
      const t = (performance.now() - start) / 1000
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ opacity }}
    />
  )
}
