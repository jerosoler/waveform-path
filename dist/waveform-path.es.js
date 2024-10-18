const U = (w) => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const C = new AudioContext();
  return fetch(w).then((u) => u.arrayBuffer()).then((u) => C.decodeAudioData(u)).catch((u) => {
    console.error(u);
  });
}, X = (w, C) => {
  const {
    channel: u = 0,
    samples: A = w.length,
    height: t = 100,
    width: c = 800,
    top: g = 0,
    left: i = 0,
    type: m = "steps",
    paths: e = [{ d: "Q", sx: 0, sy: 0, x: 50, y: 100, ex: 100, ey: 0 }],
    animation: Z = !1,
    animationframes: W = 10,
    normalize: G = !0
  } = C, o = J(w, u, Z, W), q = K(o, A), O = G ? T(q) : q;
  let y = "";
  const D = m != "bars" ? (t + g * 2) / 2 : t + g, p = c / A, j = e.length, z = m == "mirror" ? j * 2 : j, B = O.length;
  for (let M = 0; M < B; M++) {
    if (M > 0) {
      const d = y.length;
      y.charAt(d - 1) == ";" || d === 0 ? y += " M 0 0 ;" : y += ";";
    }
    let $ = -9999, h = -9999;
    for (let d = 0; d < A; d++) {
      const k = m != "bars" ? d % 2 ? 1 : -1 : 1;
      let f = 1;
      for (let P = 0; P < z; P++) {
        let n = P;
        P >= j && (n = P - j, f = -1), e[n].minshow = e[n].minshow ?? 0, e[n].maxshow = e[n].maxshow ?? 1, e[n].normalize = e[n].normalize ?? !1;
        const b = e[n].normalize ? 1 : O[M][d];
        if (e[n].minshow <= O[M][d] && e[n].maxshow >= O[M][d])
          switch (e[n].d) {
            case "L": {
              const _ = d * p + p * e[n].sx / 100 + i, a = D + b * e[n].sy / 100 * (m != "bars" ? t / 2 : t) * -k * f, r = d * p + p * e[n].ex / 100 + i, l = D + b * e[n].ey / 100 * (m != "bars" ? t / 2 : t) * -k * f;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `), y += `L ${r} ${l} `, $ = r, h = l;
              break;
            }
            case "H": {
              const _ = d * p + p * e[n].sx / 100 + i, a = D + b * e[n].y / 100 * (m != "bars" ? t / 2 : t) * -k * f, r = d * p + p * e[n].ex / 100 + i, l = a;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `), y += `H ${r} `, $ = r, h = l;
              break;
            }
            case "V": {
              const _ = d * p + p * e[n].x / 100 + i, a = D + b * e[n].sy / 100 * (m != "bars" ? t / 2 : t) * -k * f, r = _, l = D + b * e[n].ey / 100 * (m != "bars" ? t / 2 : t) * -k * f;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `), y += `V ${l} `, $ = r, h = l;
              break;
            }
            case "C": {
              const _ = d * p + p * e[n].sx / 100 + i, a = D - D * e[n].sy / 100 * k, r = d * p + p * e[n].x / 100 + i, l = D + b * e[n].y / 100 * (m != "bars" ? t : t * 2) * -k * f, v = d * p + p * e[n].ex / 100 + i, s = D - D * e[n].ey / 100 * k;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `), y += `C ${_} ${a} ${r} ${l} ${v} ${s} `, $ = v, h = s;
              break;
            }
            case "Q": {
              const _ = d * p + p * e[n].sx / 100 + i, a = D + b * e[n].sy / 100 * (m != "bars" ? t / 2 : t) * -k * f, r = d * p + p * e[n].x / 100 + i, l = D + b * e[n].y / 100 * (m != "bars" ? t : t * 2) * -k * f, v = d * p + p * e[n].ex / 100 + i, s = D + b * e[n].ey / 100 * (m != "bars" ? t / 2 : t) * -k * f;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `), y += `Q ${r} ${l} ${v} ${s} `, $ = v, h = s;
              break;
            }
            case "A": {
              const _ = d * p + p * e[n].sx / 100 + i, a = D + b * e[n].sy / 100 * (m != "bars" ? t / 2 : t) * -k * f, r = d * p + p * e[n].ex / 100 + i, l = D + b * e[n].ey / 100 * (m != "bars" ? t / 2 : t) * -k * f;
              (_ !== $ || a !== h) && (y += `M ${_} ${a} `);
              const v = e[n].rx * p / 100, s = e[n].ry * p / 100;
              let x = e[n].sweep;
              k == -1 && (x == 1 ? x = 0 : x = 1), f == -1 && (x == 1 ? x = 0 : x = 1), y += `A ${v} ${s} ${e[n].angle} ${e[n].arc} ${x} ${r} ${l} `, $ = r, h = l;
              break;
            }
            case "Z":
              y += "Z ";
              break;
          }
      }
    }
  }
  return y;
}, Y = (w, C) => {
  const {
    channel: u = 0,
    samples: A = w.length,
    distance: t = 50,
    length: c = 100,
    top: g = 0,
    left: i = 0,
    type: m = "steps",
    startdeg: e = 0,
    enddeg: Z = 360,
    invertdeg: W = !1,
    invertpath: G = !1,
    paths: o = [{ d: "Q", sdeg: 0, sr: 0, deg: 50, r: 100, edeg: 100, er: 0 }],
    animation: q = !1,
    animationframes: O = 10,
    normalize: y = !0
  } = C, D = J(w, u, q, O), p = K(D, A), j = y ? T(p) : p;
  let z = "";
  const B = Z < e ? Z + 360 : Z, M = W ? (e - B) / A : (B - e) / A, $ = W ? 90 + e + 180 : 90 + e, h = G ? -1 : 1, d = o.length, k = m == "mirror" ? d * 2 : d, f = Math.PI / 180, P = j.length;
  for (let n = 0; n < P; n++) {
    if (n > 0) {
      const a = z.length;
      z.charAt(a - 1) == ";" || a === 0 ? z += " M 0 0 ;" : z += ";";
    }
    let b = -9999, _ = -9999;
    for (let a = 0; a < A; a++) {
      const r = m != "bars" ? a % 2 ? 1 : -1 : 1;
      let l = 1;
      for (let v = 0; v < k; v++) {
        let s = v;
        v >= d && (s = v - d, l = -1), o[s].minshow = o[s].minshow ?? 0, o[s].maxshow = o[s].maxshow ?? 1, o[s].normalize = o[s].normalize ?? !1;
        const x = o[s].normalize ? 1 : j[n][a];
        if (o[s].minshow <= j[n][a] && o[s].maxshow >= j[n][a])
          switch (o[s].d) {
            case "L": {
              const S = (M * (a + o[s].sdeg / 100) - $) * f, E = (M * (a + o[s].edeg / 100) - $) * f, V = i + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.cos(S), L = g + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.sin(S), Q = i + (c * (o[s].er / 100) * x * r * l * h + t) * Math.cos(E), H = g + (c * (o[s].er / 100) * x * r * l * h + t) * Math.sin(E);
              (V !== b || L !== _) && (z += `M ${V} ${L} `), z += `L ${Q} ${H} `, b = Q, _ = H;
              break;
            }
            case "C": {
              const S = (M * (a + o[s].sdeg / 100) - $) * f, E = (M * (a + o[s].deg / 100) - $) * f, V = (M * (a + o[s].edeg / 100) - $) * f, L = i + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.cos(S), Q = g + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.sin(S), H = i + (c * (o[s].r / 100) * x * r * l * h + t) * Math.cos(E), R = g + (c * (o[s].r / 100) * x * r * l * h + t) * Math.sin(E), F = i + (c * (o[s].er / 100) * x * r * l * h + t) * Math.cos(V), I = g + (c * (o[s].er / 100) * x * r * l * h + t) * Math.sin(V);
              (L !== b || Q !== _) && (z += `M ${L} ${Q} `), z += `C ${L} ${Q} ${H} ${R} ${F} ${I} `, b = F, _ = I;
              break;
            }
            case "Q": {
              const S = (M * (a + o[s].sdeg / 100) - $) * f, E = (M * (a + o[s].deg / 100) - $) * f, V = (M * (a + o[s].edeg / 100) - $) * f, L = i + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.cos(S), Q = g + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.sin(S), H = i + (c * (o[s].r / 100) * x * r * l * h + t) * Math.cos(E), R = g + (c * (o[s].r / 100) * x * r * l * h + t) * Math.sin(E), F = i + (c * (o[s].er / 100) * x * r * l * h + t) * Math.cos(V), I = g + (c * (o[s].er / 100) * x * r * l * h + t) * Math.sin(V);
              (L !== b || Q !== _) && (z += `M ${L} ${Q} `), z += `Q ${H} ${R} ${F} ${I} `, b = F, _ = I;
              break;
            }
            case "A": {
              const S = (M * (a + o[s].sdeg / 100) - $) * f, E = (M * (a + o[s].edeg / 100) - $) * f, V = i + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.cos(S), L = g + (c * (o[s].sr / 100) * x * r * l * h + t) * Math.sin(S), Q = i + (c * (o[s].er / 100) * x * r * l * h + t) * Math.cos(E), H = g + (c * (o[s].er / 100) * x * r * l * h + t) * Math.sin(E);
              (V !== b || L !== _) && (z += `M ${V} ${L} `);
              const R = M * a * o[s].angle / 100, F = o[s].rx * M / 100, I = o[s].ry * M / 100;
              let N = o[s].sweep;
              r == -1 && (N == 1 ? N = 0 : N = 1), l == -1 && (N == 1 ? N = 0 : N = 1), z += `A ${F} ${I} ${R} ${o[s].arc} ${N} ${Q} ${H} `, b = Q, _ = H;
              break;
            }
            case "Z":
              z += "Z ";
              break;
          }
      }
    }
  }
  return z;
}, J = (w, C, u, A) => {
  const t = w.getChannelData(C), c = [];
  if (u) {
    const g = w.sampleRate / A;
    for (let i = 0; i < t.length; i += g) {
      const m = t.slice(i, i + g);
      c.push(m);
    }
  } else
    c.push(t);
  return c;
}, K = (w, C) => {
  const u = [], A = w.length;
  for (let t = 0; t < A; t++) {
    const c = Math.floor(w[t].length / C), g = [];
    for (let i = 0; i < C; i++) {
      let m = c * i, e = 0;
      for (let Z = 0; Z < c; Z++)
        e = e + Math.abs(w[t][m + Z]);
      g.push(e / c);
    }
    u.push(g);
  }
  return u;
}, T = (w) => {
  const C = [], u = w.length;
  for (let c = 0; c < u; c++) {
    const g = Math.max(...w[c]);
    C.push(g);
  }
  const A = Math.pow(Math.max(...C), -1), t = [];
  for (let c = 0; c < u; c++) {
    const g = w[c].map((i) => i * A);
    t.push(g);
  }
  return t;
};
export {
  U as getAudioData,
  X as linearPath,
  Y as polarPath
};
