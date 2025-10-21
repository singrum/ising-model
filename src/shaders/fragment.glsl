precision highp float;

uniform sampler2D uPrevState;   // 이전 상태 텍스처
uniform vec2 uResolution;
uniform float uTemperature;
uniform float uTime;

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 offset = 1.0 / uResolution;

    // 현재 픽셀 spin (+1/-1)
    float spin = texture(uPrevState, vUv).r > 0.5 ? 1.0 : -1.0;

    // 4방향 이웃 spin 합
    float sumNeighbors = 0.0;
    sumNeighbors += texture(uPrevState, vUv + vec2(offset.x, 0.0)).r > 0.5 ? 1.0 : -1.0;
    sumNeighbors += texture(uPrevState, vUv - vec2(offset.x, 0.0)).r > 0.5 ? 1.0 : -1.0;
    sumNeighbors += texture(uPrevState, vUv + vec2(0.0, offset.y)).r > 0.5 ? 1.0 : -1.0;
    sumNeighbors += texture(uPrevState, vUv - vec2(0.0, offset.y)).r > 0.5 ? 1.0 : -1.0;

    // Metropolis 알고리즘
    float dE = 2.0 * spin * sumNeighbors;
    float r = rand(gl_FragCoord.xy + uTime);
    if(dE <= 0.0 || r < exp(-dE / uTemperature)) spin = -spin;

    gl_FragColor = vec4(vec3(spin > 0.0 ? 1.0 : 0.0), 1.0);
}
