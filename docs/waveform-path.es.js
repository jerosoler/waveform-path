function B(x) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const z = new AudioContext();
  return fetch(x).then((d) => d.arrayBuffer()).then((d) => z.decodeAudioData(d)).catch((d) => {
    console.error(d);
  });
}
function tt(x, z) {
  const {
    channel: d = 0,
    samples: b = x.length,
    animation: r = !1,
    animationframes: a = 10,
    normalize: g = !0,
    height: e = 100,
    width: H = 800,
    top: C = 0,
    left: $ = 0,
    type: w = "steps",
    paths: q = [
      { d: "Q", sx: 0, sy: 0, x: 50, y: 100, ex: 100, ey: 0 }
    ]
  } = z, G = U(
    x,
    d,
    r,
    a
  ), J = X(G, b), O = g ? Y(J) : J;
  let m = "";
  const D = w != "bars" ? (e + C * 2) / 2 : e + C, i = H / b, V = q.length, A = w == "mirror" ? V * 2 : V, K = O.length;
  for (let y = 0; y < K; y++) {
    if (y > 0) {
      const p = m.length;
      m.charAt(p - 1) == ";" || p === 0 ? m += " M 0 0 ;" : m += ";";
    }
    let f = -9999, l = -9999;
    for (let p = 0; p < b; p++) {
      const k = w != "bars" ? p % 2 ? 1 : -1 : 1;
      let _ = 1;
      for (let R = 0; R < A; R++) {
        let Z = R;
        R >= V && (Z = R - V, _ = -1);
        const s = q[Z];
        s.minshow = s.minshow ?? 0, s.maxshow = s.maxshow ?? 1, s.normalize = s.normalize ?? !1;
        const M = s.normalize ? 1 : O[y][p];
        if (s.minshow <= O[y][p] && s.maxshow >= O[y][p])
          switch (s.d) {
            case "L": {
              const o = p * i + i * s.sx / 100 + $, n = D + M * s.sy / 100 * (w != "bars" ? e / 2 : e) * -k * _, c = p * i + i * s.ex / 100 + $, u = D + M * s.ey / 100 * (w != "bars" ? e / 2 : e) * -k * _;
              (o !== f || n !== l) && (m += `M ${o} ${n} `), m += `L ${c} ${u} `, f = c, l = u;
              break;
            }
            case "H": {
              const o = p * i + i * s.sx / 100 + $, n = D + M * s.y / 100 * (w != "bars" ? e / 2 : e) * -k * _, c = p * i + i * s.ex / 100 + $, u = n;
              (o !== f || n !== l) && (m += `M ${o} ${n} `), m += `H ${c} `, f = c, l = u;
              break;
            }
            case "V": {
              const o = p * i + i * s.x / 100 + $, n = D + M * s.sy / 100 * (w != "bars" ? e / 2 : e) * -k * _, c = o, u = D + M * s.ey / 100 * (w != "bars" ? e / 2 : e) * -k * _;
              (o !== f || n !== l) && (m += `M ${o} ${n} `), m += `V ${u} `, f = c, l = u;
              break;
            }
            case "C": {
              const o = p * i + i * s.sx / 100 + $, n = D - D * s.sy / 100 * k, c = p * i + i * s.x / 100 + $, u = D + M * s.y / 100 * (w != "bars" ? e : e * 2) * -k * _, E = p * i + i * s.ex / 100 + $, t = D - D * s.ey / 100 * k;
              (o !== f || n !== l) && (m += `M ${o} ${n} `), m += `C ${o} ${n} ${c} ${u} ${E} ${t} `, f = E, l = t;
              break;
            }
            case "Q": {
              const o = p * i + i * s.sx / 100 + $, n = D + M * s.sy / 100 * (w != "bars" ? e / 2 : e) * -k * _, c = p * i + i * s.x / 100 + $, u = D + M * s.y / 100 * (w != "bars" ? e : e * 2) * -k * _, E = p * i + i * s.ex / 100 + $, t = D + M * s.ey / 100 * (w != "bars" ? e / 2 : e) * -k * _;
              (o !== f || n !== l) && (m += `M ${o} ${n} `), m += `Q ${c} ${u} ${E} ${t} `, f = E, l = t;
              break;
            }
            case "A": {
              const o = p * i + i * s.sx / 100 + $, n = D + M * s.sy / 100 * (w != "bars" ? e / 2 : e) * -k * _, c = p * i + i * s.ex / 100 + $, u = D + M * s.ey / 100 * (w != "bars" ? e / 2 : e) * -k * _;
              (o !== f || n !== l) && (m += `M ${o} ${n} `);
              const E = s.rx * i / 100, t = s.ry * i / 100;
              let h = s.sweep;
              k == -1 && (h == 1 ? h = 0 : h = 1), _ == -1 && (h == 1 ? h = 0 : h = 1), m += `A ${E} ${t} ${s.angle} ${s.arc} ${h} ${c} ${u} `, f = c, l = u;
              break;
            }
            case "Z":
              m += "Z ";
              break;
          }
      }
    }
  }
  return m;
}
function st(x, z) {
  const {
    channel: d = 0,
    samples: b = x.length,
    distance: r = 50,
    length: a = 100,
    top: g = 0,
    left: e = 0,
    type: H = "steps",
    startdeg: C = 0,
    enddeg: $ = 360,
    invertdeg: w = !1,
    invertpath: q = !1,
    paths: G = [
      { d: "Q", sdeg: 0, sr: 0, deg: 50, r: 100, edeg: 100, er: 0 }
    ],
    animation: J = !1,
    animationframes: O = 10,
    normalize: m = !0
  } = z, D = U(
    x,
    d,
    J,
    O
  ), i = X(D, b), V = m ? Y(i) : i;
  let A = "";
  const K = $ < C ? $ + 360 : $, y = w ? (C - K) / b : (K - C) / b, f = w ? 90 + C + 180 : 90 + C, l = q ? -1 : 1, p = G.length, k = H == "mirror" ? p * 2 : p, _ = Math.PI / 180, R = V.length;
  for (let Z = 0; Z < R; Z++) {
    if (Z > 0) {
      const o = A.length;
      A.charAt(o - 1) == ";" || o === 0 ? A += " M 0 0 ;" : A += ";";
    }
    let s = -9999, M = -9999;
    for (let o = 0; o < b; o++) {
      const n = H != "bars" ? o % 2 ? 1 : -1 : 1;
      let c = 1;
      for (let u = 0; u < k; u++) {
        let E = u;
        u >= p && (E = u - p, c = -1);
        const t = G[E];
        t.minshow = t.minshow ?? 0, t.maxshow = t.maxshow ?? 1, t.normalize = t.normalize ?? !1;
        const h = t.normalize ? 1 : V[Z][o];
        if (t.minshow <= V[Z][o] && t.maxshow >= V[Z][o])
          switch (t.d) {
            case "L": {
              const Q = (y * (o + t.sdeg / 100) - f) * _, S = (y * (o + t.edeg / 100) - f) * _, P = e + (a * (t.sr / 100) * h * n * c * l + r) * Math.cos(Q), v = g + (a * (t.sr / 100) * h * n * c * l + r) * Math.sin(Q), L = e + (a * (t.er / 100) * h * n * c * l + r) * Math.cos(S), j = g + (a * (t.er / 100) * h * n * c * l + r) * Math.sin(S);
              (P !== s || v !== M) && (A += `M ${P} ${v} `), A += `L ${L} ${j} `, s = L, M = j;
              break;
            }
            case "C": {
              const Q = (y * (o + t.sdeg / 100) - f) * _, S = (y * (o + t.deg / 100) - f) * _, P = (y * (o + t.edeg / 100) - f) * _, v = e + (a * (t.sr / 100) * h * n * c * l + r) * Math.cos(Q), L = g + (a * (t.sr / 100) * h * n * c * l + r) * Math.sin(Q), j = e + (a * (t.r / 100) * h * n * c * l + r) * Math.cos(S), W = g + (a * (t.r / 100) * h * n * c * l + r) * Math.sin(S), F = e + (a * (t.er / 100) * h * n * c * l + r) * Math.cos(P), I = g + (a * (t.er / 100) * h * n * c * l + r) * Math.sin(P);
              (v !== s || L !== M) && (A += `M ${v} ${L} `), A += `C ${v} ${L} ${j} ${W} ${F} ${I} `, s = F, M = I;
              break;
            }
            case "Q": {
              const Q = (y * (o + t.sdeg / 100) - f) * _, S = (y * (o + t.deg / 100) - f) * _, P = (y * (o + t.edeg / 100) - f) * _, v = e + (a * (t.sr / 100) * h * n * c * l + r) * Math.cos(Q), L = g + (a * (t.sr / 100) * h * n * c * l + r) * Math.sin(Q), j = e + (a * (t.r / 100) * h * n * c * l + r) * Math.cos(S), W = g + (a * (t.r / 100) * h * n * c * l + r) * Math.sin(S), F = e + (a * (t.er / 100) * h * n * c * l + r) * Math.cos(P), I = g + (a * (t.er / 100) * h * n * c * l + r) * Math.sin(P);
              (v !== s || L !== M) && (A += `M ${v} ${L} `), A += `Q ${j} ${W} ${F} ${I} `, s = F, M = I;
              break;
            }
            case "A": {
              const Q = (y * (o + t.sdeg / 100) - f) * _, S = (y * (o + t.edeg / 100) - f) * _, P = e + (a * (t.sr / 100) * h * n * c * l + r) * Math.cos(Q), v = g + (a * (t.sr / 100) * h * n * c * l + r) * Math.sin(Q), L = e + (a * (t.er / 100) * h * n * c * l + r) * Math.cos(S), j = g + (a * (t.er / 100) * h * n * c * l + r) * Math.sin(S);
              (P !== s || v !== M) && (A += `M ${P} ${v} `);
              const W = y * o * t.angle / 100, F = t.rx * y / 100, I = t.ry * y / 100;
              let N = t.sweep;
              n == -1 && (N == 1 ? N = 0 : N = 1), c == -1 && (N == 1 ? N = 0 : N = 1), A += `A ${F} ${I} ${W} ${t.arc} ${N} ${L} ${j} `, s = L, M = j;
              break;
            }
            case "Z":
              A += "Z ";
              break;
          }
      }
    }
  }
  return A;
}
function U(x, z, d, b) {
  console.log({ sampleRate: x.sampleRate });
  const r = x.getChannelData(z), a = [];
  if (d) {
    const g = x.sampleRate / b;
    for (let e = 0; e < r.length; e += g) {
      const H = r.slice(e, e + g);
      a.push(H);
    }
  } else
    a.push(r);
  return a;
}
function X(x, z) {
  const d = [], b = x.length;
  for (let r = 0; r < b; r++) {
    const a = Math.floor(x[r].length / z), g = [];
    for (let e = 0; e < z; e++) {
      let H = a * e, C = 0;
      for (let $ = 0; $ < a; $++)
        C = C + Math.abs(x[r][H + $]);
      g.push(C / a);
    }
    d.push(g);
  }
  return d;
}
function Y(x) {
  const z = [], d = x.length;
  for (let a = 0; a < d; a++) {
    const g = T(x[a]);
    z.push(g);
  }
  const b = Math.pow(T(z), -1), r = [];
  for (let a = 0; a < d; a++) {
    const g = x[a].map((e) => e * b);
    r.push(g);
  }
  return r;
}
function T(x) {
  let z = x.length, d = -1 / 0;
  for (; z--; ) {
    let b = Math.abs(x[z]);
    d = b > d ? b : d;
  }
  return d;
}
export {
  B as getAudioData,
  X as getFilterData,
  U as getFramesData,
  Y as getNormalizeData,
  tt as linearPath,
  st as polarPath
};
