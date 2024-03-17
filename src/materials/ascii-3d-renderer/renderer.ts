// @ts-nocheck
var S = Object.defineProperty;
var Z = (d, t, i) =>
  t in d
    ? S(d, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (d[t] = i);
var e = (d, t, i) => (Z(d, typeof t != "symbol" ? t + "" : t, i), i);
class g {
  constructor(t, i) {
    e(this, "x");
    e(this, "y");
    (this.x = t), (this.y = i);
  }
  add(t) {
    return new g(this.x + t.x, this.y + t.y);
  }
  subtract(t) {
    return new g(this.x - t.x, this.y - t.y);
  }
  multiply(t) {
    return new g(this.x * t, this.y * t);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const t = this.length();
    return new g(this.x / t, this.y / t);
  }
}
class o {
  constructor(t, i, s) {
    e(this, "x");
    e(this, "y");
    e(this, "z");
    (this.x = t), (this.y = i), (this.z = s);
  }
  add(t) {
    return new o(this.x + t.x, this.y + t.y, this.z + t.z);
  }
  subtract(t) {
    return new o(this.x - t.x, this.y - t.y, this.z - t.z);
  }
  multiply(t) {
    return new o(this.x * t, this.y * t, this.z * t);
  }
  rotateX(t) {
    return new o(
      this.x,
      this.y * Math.cos(t) - this.z * Math.sin(t),
      this.y * Math.sin(t) + this.z * Math.cos(t)
    );
  }
  rotateY(t) {
    return new o(
      this.x * Math.cos(t) + this.z * -Math.sin(t),
      this.y,
      this.x * Math.sin(t) + this.z * Math.cos(t)
    );
  }
  rotateZ(t) {
    return new o(
      this.x * Math.cos(t) - this.y * Math.sin(t),
      this.x * Math.sin(t) + this.y * Math.cos(t),
      this.z
    );
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  cross(t) {
    return new o(
      this.y * t.z - this.z * t.y,
      this.z * t.x - this.x * t.z,
      this.x * t.y - this.y * t.x
    );
  }
  normalize() {
    const t = this.length();
    return new o(this.x / t, this.y / t, this.z / t);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
}
class f {
  constructor(t, i, s, m) {
    e(this, "x");
    e(this, "y");
    e(this, "z");
    e(this, "w");
    (this.x = t), (this.y = i), (this.z = s), (this.w = m);
  }
  add(t) {
    return new f(this.x + t.x, this.y + t.y, this.z + t.z, this.w + t.w);
  }
  subtract(t) {
    return new f(this.x - t.x, this.y - t.y, this.z - t.z, this.w - t.w);
  }
  multiply(t) {
    return new f(this.x * t, this.y * t, this.z * t, this.w * t);
  }
  transform(t) {
    const i = this.x,
      s = this.y,
      m = this.z,
      h = this.w;
    return new f(
      t.m00 * i + t.m10 * s + t.m20 * m + t.m30 * h,
      t.m01 * i + t.m11 * s + t.m21 * m + t.m31 * h,
      t.m02 * i + t.m12 * s + t.m22 * m + t.m32 * h,
      t.m03 * i + t.m13 * s + t.m23 * m + t.m33 * h
    );
  }
}
class u {
  constructor(t, i, s, m, h, n, r, c, a, l, z, p, F, w, y, M) {
    e(this, "m00");
    e(this, "m01");
    e(this, "m02");
    e(this, "m03");
    e(this, "m10");
    e(this, "m11");
    e(this, "m12");
    e(this, "m13");
    e(this, "m20");
    e(this, "m21");
    e(this, "m22");
    e(this, "m23");
    e(this, "m30");
    e(this, "m31");
    e(this, "m32");
    e(this, "m33");
    (this.m00 = t),
      (this.m01 = i),
      (this.m02 = s),
      (this.m03 = m),
      (this.m10 = h),
      (this.m11 = n),
      (this.m12 = r),
      (this.m13 = c),
      (this.m20 = a),
      (this.m21 = l),
      (this.m22 = z),
      (this.m23 = p),
      (this.m30 = F),
      (this.m31 = w),
      (this.m32 = y),
      (this.m33 = M);
  }
  static identity() {
    return new u(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  add(t) {
    return new u(
      this.m00 + t.m00,
      this.m01 + t.m01,
      this.m02 + t.m02,
      this.m03 + t.m03,
      this.m10 + t.m10,
      this.m11 + t.m11,
      this.m12 + t.m12,
      this.m13 + t.m13,
      this.m20 + t.m20,
      this.m21 + t.m21,
      this.m22 + t.m22,
      this.m23 + t.m23,
      this.m30 + t.m30,
      this.m31 + t.m31,
      this.m32 + t.m32,
      this.m33 + t.m33
    );
  }
  subtract(t) {
    return new u(
      this.m00 - t.m00,
      this.m01 - t.m01,
      this.m02 - t.m02,
      this.m03 - t.m03,
      this.m10 - t.m10,
      this.m11 - t.m11,
      this.m12 - t.m12,
      this.m13 - t.m13,
      this.m20 - t.m20,
      this.m21 - t.m21,
      this.m22 - t.m22,
      this.m23 - t.m23,
      this.m30 - t.m30,
      this.m31 - t.m31,
      this.m32 - t.m32,
      this.m33 - t.m33
    );
  }
  multiply(t) {
    return new u(
      this.m00 * t.m00 + this.m01 * t.m10 + this.m02 * t.m20 + this.m03 * t.m30,
      this.m00 * t.m01 + this.m01 * t.m11 + this.m02 * t.m21 + this.m03 * t.m31,
      this.m00 * t.m02 + this.m01 * t.m12 + this.m02 * t.m22 + this.m03 * t.m32,
      this.m00 * t.m03 + this.m01 * t.m13 + this.m02 * t.m23 + this.m03 * t.m33,
      this.m10 * t.m00 + this.m11 * t.m10 + this.m12 * t.m20 + this.m13 * t.m30,
      this.m10 * t.m01 + this.m11 * t.m11 + this.m12 * t.m21 + this.m13 * t.m31,
      this.m10 * t.m02 + this.m11 * t.m12 + this.m12 * t.m22 + this.m13 * t.m32,
      this.m10 * t.m03 + this.m11 * t.m13 + this.m12 * t.m23 + this.m13 * t.m33,
      this.m20 * t.m00 + this.m21 * t.m10 + this.m22 * t.m20 + this.m23 * t.m30,
      this.m20 * t.m01 + this.m21 * t.m11 + this.m22 * t.m21 + this.m23 * t.m31,
      this.m20 * t.m02 + this.m21 * t.m12 + this.m22 * t.m22 + this.m23 * t.m32,
      this.m20 * t.m03 + this.m21 * t.m13 + this.m22 * t.m23 + this.m23 * t.m33,
      this.m30 * t.m00 + this.m31 * t.m10 + this.m32 * t.m20 + this.m33 * t.m30,
      this.m30 * t.m01 + this.m31 * t.m11 + this.m32 * t.m21 + this.m33 * t.m31,
      this.m30 * t.m02 + this.m31 * t.m12 + this.m32 * t.m22 + this.m33 * t.m33,
      this.m30 * t.m03 + this.m31 * t.m13 + this.m32 * t.m23 + this.m33 * t.m33
    );
  }
  scale(t) {
    return new u(
      this.m00 * t,
      this.m01 * t,
      this.m02 * t,
      this.m03 * t,
      this.m10 * t,
      this.m11 * t,
      this.m12 * t,
      this.m13 * t,
      this.m20 * t,
      this.m21 * t,
      this.m22 * t,
      this.m23 * t,
      this.m30 * t,
      this.m31 * t,
      this.m32 * t,
      this.m33 * t
    );
  }
  translate(t) {
    const i = this.m30 + this.m00 * t.x + this.m10 * t.y + this.m20 * t.z,
      s = this.m31 + this.m01 * t.x + this.m11 * t.y + this.m21 * t.z,
      m = this.m32 + this.m02 * t.x + this.m12 * t.y + this.m22 * t.z,
      h = this.m33 + this.m03 * t.x + this.m13 * t.y + this.m23 * t.z;
    return new u(
      this.m00,
      this.m01,
      this.m02,
      this.m03,
      this.m10,
      this.m11,
      this.m12,
      this.m13,
      this.m20,
      this.m21,
      this.m22,
      this.m23,
      i,
      s,
      m,
      h
    );
  }
  rotate(t, i) {
    const s = Math.cos(i),
      m = Math.sin(i),
      h = 1 - s,
      n = t.x * t.y,
      r = t.y * t.z,
      c = t.x * t.z,
      a = t.x * m,
      l = t.y * m,
      z = t.z * m,
      p = t.x * t.x * h + s,
      F = n * h + z,
      w = c * h - l,
      y = n * h - z,
      M = t.y * t.y * h + s,
      B = r * h + a,
      x = c * h + l,
      b = r * h - a,
      I = t.z * t.z * h + s,
      X = this.m00 * p + this.m10 * F + this.m20 * w,
      Y = this.m01 * p + this.m11 * F + this.m21 * w,
      L = this.m02 * p + this.m12 * F + this.m22 * w,
      T = this.m03 * p + this.m13 * F + this.m23 * w,
      q = this.m00 * y + this.m10 * M + this.m20 * B,
      D = this.m01 * y + this.m11 * M + this.m21 * B,
      E = this.m02 * y + this.m12 * M + this.m22 * B,
      R = this.m03 * y + this.m13 * M + this.m23 * B;
    (this.m20 = this.m00 * x + this.m10 * b + this.m20 * I),
      (this.m21 = this.m01 * x + this.m11 * b + this.m21 * I),
      (this.m22 = this.m02 * x + this.m12 * b + this.m22 * I),
      (this.m23 = this.m03 * x + this.m13 * b + this.m23 * I),
      (this.m00 = X),
      (this.m01 = Y),
      (this.m02 = L),
      (this.m03 = T),
      (this.m10 = q),
      (this.m11 = D),
      (this.m12 = E),
      (this.m13 = R);
  }
  // rotateX(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     1, 0, 0, 0,
  //     0, cos, -sin, 0,
  //     0, sin, cos, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }
  // rotateY(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     cos, 0, -sin, 0,
  //     0, 1, 0, 0,
  //     sin, 0, cos, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }
  // rotateZ(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     cos, -sin, 0, 0,
  //     sin, cos, 0, 0,
  //     0, 0, 1, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }
  setIdentity() {
    (this.m00 = 1),
      (this.m01 = 0),
      (this.m02 = 0),
      (this.m03 = 0),
      (this.m10 = 0),
      (this.m11 = 1),
      (this.m12 = 0),
      (this.m13 = 0),
      (this.m20 = 0),
      (this.m21 = 0),
      (this.m22 = 1),
      (this.m23 = 0),
      (this.m30 = 0),
      (this.m31 = 0),
      (this.m32 = 0),
      (this.m33 = 1);
  }
}
class j {
  constructor(t) {
    e(this, "vertices");
    this.vertices = t;
  }
}
class k {
  constructor() {
    e(this, "eye");
    e(this, "look");
    e(this, "up");
    e(this, "rotation");
    e(this, "viewMatrix");
    (this.eye = new o(0, 0, 0)),
      (this.look = new o(0, 0, 1)),
      (this.up = new o(0, 1, 0)),
      (this.rotation = new o(0, 0, 0)),
      (this.viewMatrix = u.identity());
  }
  transform(t) {
    return t.transform(this.viewMatrix);
  }
  calculateViewMatrix() {
    const i = this.look
        .rotateX(this.rotation.x)
        .rotateY(this.rotation.y)
        .rotateZ(this.rotation.z)
        .add(this.eye)
        .subtract(this.eye)
        .normalize(),
      s = i.multiply(this.up.dot(i)),
      m = this.up.subtract(s).normalize(),
      h = m.cross(i);
    this.viewMatrix = new u(
      h.x,
      h.y,
      h.z,
      0,
      m.x,
      m.y,
      m.z,
      0,
      i.x,
      i.y,
      i.z,
      0,
      this.eye.x,
      this.eye.y,
      this.eye.z,
      1
    );
  }
  calculatePerspectiveMatrix(t, i, s, m) {
    const h = u.identity(),
      n = Math.tan(t / 2);
    return (
      (h.m00 = 1 / (n * i)),
      (h.m11 = 1 / n),
      (h.m22 = -(m + s) / (m - s)),
      (h.m23 = -1),
      (h.m32 = -(2 * m * s) / (m - s)),
      h
    );
  }
}
class P {
  static loadFromFile(t) {
    return new Promise((i, s) => {
      const m = new FileReader();
      (m.onload = h => {
        var r;
        const n = (r = h.target) == null ? void 0 : r.result;
        n ? i(this.parseOBJ(n)) : s(new Error("Failed to load file"));
      }),
        m.readAsText(t);
    });
  }
  static loadFromString(t) {
    return this.parseOBJ(t);
  }
  static parseOBJ(t) {
    const i = t.split(`
`),
      s = [],
      m = [];
    for (const h of i) {
      const n = h
        .trim()
        .split(" ")
        .filter(r => r !== "");
      n[0] === "v"
        ? s.push(new o(parseFloat(n[1]), parseFloat(n[2]), parseFloat(n[3])))
        : n[0] === "f" &&
          m.push(
            new j([
              s[parseInt(n[1]) - 1],
              s[parseInt(n[2]) - 1],
              s[parseInt(n[3]) - 1],
            ])
          );
    }
    return m;
  }
}
class C {
  constructor() {
    e(this, "matrix");
    this.matrix = u.identity();
  }
  transform(t) {
    return t.transform(this.matrix);
  }
  translate(t) {
    this.matrix = this.matrix.translate(t);
  }
  rotateX(t) {
    this.matrix.rotate(new o(1, 0, 0), t);
  }
  rotateY(t) {
    this.matrix.rotate(new o(0, 1, 0), t);
  }
  rotateZ(t) {
    this.matrix.rotate(new o(0, 0, 1), t);
  }
}
class J {
  constructor(t, i, s) {
    e(this, "el");
    e(this, "width");
    e(this, "height");
    e(this, "frameBuffer");
    e(this, "depthBuffer");
    e(this, "mesh", []);
    e(this, "camera");
    e(this, "world");
    e(this, "angle");
    (this.el = t),
      (this.width = i),
      (this.height = s),
      (this.frameBuffer = new Array(s + 1)
        .fill(null)
        .map(() => new Array(i + 1).fill(" "))),
      (this.depthBuffer = new Array(s + 1)
        .fill(null)
        .map(() => new Array(i + 1).fill(255))),
      (this.camera = new k()),
      (this.world = new C()),
      (this.angle = 0);
  }
  async loadFromFile(t) {
    this.mesh = await P.loadFromFile(t);
  }
  async loadFromString(t) {
    this.mesh = await P.loadFromString(t);
  }
  run() {
    const i = 16.666666666666668;
    let s = Date.now(),
      m,
      h;
    const n = () => {
      (m = Date.now()),
        (h = m - s),
        h > i &&
          ((s = m - (h % i)),
          this.render(),
          (this.angle += 7e-3),
          this.angle >= 2 * 3.14 && (this.angle -= 2 * 3.14)),
        requestAnimationFrame(n);
    };
    requestAnimationFrame(n);
  }
  render() {
    this.clearFrameBuffer(), this.process(), this.drawFrameBuffer();
  }
  process() {
    (this.camera.eye = new o(0, 0, 0)), this.camera.calculateViewMatrix();
    const t = this.camera.calculatePerspectiveMatrix(
      70,
      this.width / 2 / this.height,
      0.1,
      1e3
    );
    this.world.matrix.setIdentity(),
      this.world.translate(new o(0, 0, -7)),
      this.world.rotateX(this.angle),
      this.world.rotateY(this.angle),
      this.world.rotateZ(this.angle),
      this.mesh.forEach(i => {
        let s = new f(i.vertices[0].x, i.vertices[0].y, i.vertices[0].z, 1),
          m = new f(i.vertices[1].x, i.vertices[1].y, i.vertices[1].z, 1),
          h = new f(i.vertices[2].x, i.vertices[2].y, i.vertices[2].z, 1);
        (s = this.world.transform(s)),
          (m = this.world.transform(m)),
          (h = this.world.transform(h));
        const n = new o(s.x, s.y, s.z).subtract(new o(m.x, m.y, m.z)),
          r = new o(s.x, s.y, s.z).subtract(new o(h.x, h.y, h.z)),
          c = n.cross(r).normalize(),
          a = new o(s.x, s.y, s.z).subtract(this.camera.eye);
        if (c.dot(a) >= 0) return;
        (s = this.camera.transform(s)),
          (m = this.camera.transform(m)),
          (h = this.camera.transform(h)),
          (s = this.transformVertex(s, t)),
          (m = this.transformVertex(m, t)),
          (h = this.transformVertex(h, t));
        const l = new o(0, 0, 1).normalize(),
          z = Math.max(0, c.dot(l));
        this.rasterize(
          new f(s.x, s.y, s.z, s.w),
          new f(m.x, m.y, m.z, m.w),
          new f(h.x, h.y, h.z, h.w),
          z
        );
      });
  }
  transformVertex(t, i) {
    const s = t.transform(i);
    return (s.x /= s.w), (s.y /= s.w), (s.z /= s.w), s;
  }
  rasterize(t, i, s, m) {
    const h = this.width / 2,
      n = this.height / 2,
      r = new g(t.x * h + h, -t.y * n + n),
      c = new g(i.x * h + h, -i.y * n + n),
      a = new g(s.x * h + h, -s.y * n + n),
      l = Math.floor(Math.max(0, Math.min(r.x, Math.min(c.x, a.x)))),
      z = Math.floor(Math.max(0, Math.min(r.y, Math.min(c.y, a.y)))),
      p = Math.floor(
        Math.min(this.width, Math.max(r.x, Math.max(c.x, a.x)) + 1)
      ),
      F = Math.floor(
        Math.min(this.height, Math.max(r.y, Math.max(c.y, a.y)) + 1)
      );
    for (let w = z; w < F; w++)
      for (let y = l; y < p; y++)
        if (this.isPointInTriangle(y, w, r, c, a)) {
          const M = w * this.width + y;
          if (M > this.height * this.width || M < 0) continue;
          if ((t.w + i.w + s.w) / 3 <= this.depthBuffer[w][y]) {
            const B = "·┼╬░▒▓█";
            (this.frameBuffer[w][y] = B[Math.round((B.length - 1) * m)]),
              (this.depthBuffer[w][y] = (t.w + i.w + s.w) / 3);
          }
        }
  }
  isPointInTriangle(t, i, s, m, h) {
    const n =
        ((m.y - h.y) * (t - h.x) + (h.x - m.x) * (i - h.y)) /
        ((m.y - h.y) * (s.x - h.x) + (h.x - m.x) * (s.y - h.y)),
      r =
        ((h.y - s.y) * (t - h.x) + (s.x - h.x) * (i - h.y)) /
        ((m.y - h.y) * (s.x - h.x) + (h.x - m.x) * (s.y - h.y)),
      c = 1 - n - r,
      a = n < -1e-3,
      l = r < -1e-3,
      z = c < -1e-3;
    return a == l && l == z;
  }
  drawFrameBuffer() {
    (this.el.innerHTML = ""),
      this.frameBuffer.forEach(t => {
        const i = document.createElement("div");
        (i.innerHTML = t.join("").replace(/\ /g, "&nbsp;")),
          this.el.appendChild(i);
      });
  }
  clearFrameBuffer() {
    (this.frameBuffer = new Array(this.height + 1)
      .fill(null)
      .map(() => new Array(this.width + 1).fill(" "))),
      (this.depthBuffer = new Array(this.height + 1)
        .fill(null)
        .map(() => new Array(this.width + 1).fill(255)));
  }
}
export { J as ASCII3DRenderer };
