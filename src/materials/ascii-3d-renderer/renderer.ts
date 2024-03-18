// @ts-nocheck
var A = Object.defineProperty;
var b = (y, t, h) =>
  t in y
    ? A(y, t, { enumerable: !0, configurable: !0, writable: !0, value: h })
    : (y[t] = h);
var n = (y, t, h) => (b(y, typeof t != "symbol" ? t + "" : t, h), h);
class z {
  constructor(t, h) {
    n(this, "x");
    n(this, "y");
    (this.x = t), (this.y = h);
  }
  add(t) {
    return new z(this.x + t.x, this.y + t.y);
  }
  subtract(t) {
    return new z(this.x - t.x, this.y - t.y);
  }
  multiply(t) {
    return new z(this.x * t, this.y * t);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normalize() {
    const t = this.length();
    return new z(this.x / t, this.y / t);
  }
}
class r {
  constructor(t, h, s) {
    n(this, "x");
    n(this, "y");
    n(this, "z");
    (this.x = t), (this.y = h), (this.z = s);
  }
  static zero() {
    return new r(0, 0, 0);
  }
  add(t) {
    return new r(this.x + t.x, this.y + t.y, this.z + t.z);
  }
  subtract(t) {
    return new r(this.x - t.x, this.y - t.y, this.z - t.z);
  }
  multiply(t) {
    return new r(this.x * t, this.y * t, this.z * t);
  }
  rotateX(t) {
    return new r(
      this.x,
      this.y * Math.cos(t) - this.z * Math.sin(t),
      this.y * Math.sin(t) + this.z * Math.cos(t)
    );
  }
  rotateY(t) {
    return new r(
      this.x * Math.cos(t) + this.z * -Math.sin(t),
      this.y,
      this.x * Math.sin(t) + this.z * Math.cos(t)
    );
  }
  rotateZ(t) {
    return new r(
      this.x * Math.cos(t) - this.y * Math.sin(t),
      this.x * Math.sin(t) + this.y * Math.cos(t),
      this.z
    );
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  cross(t) {
    return new r(
      this.y * t.z - this.z * t.y,
      this.z * t.x - this.x * t.z,
      this.x * t.y - this.y * t.x
    );
  }
  normalize() {
    const t = this.length();
    return new r(this.x / t, this.y / t, this.z / t);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
}
class w {
  constructor(t, h, s, e) {
    n(this, "x");
    n(this, "y");
    n(this, "z");
    n(this, "w");
    (this.x = t), (this.y = h), (this.z = s), (this.w = e);
  }
  add(t) {
    return new w(this.x + t.x, this.y + t.y, this.z + t.z, this.w + t.w);
  }
  subtract(t) {
    return new w(this.x - t.x, this.y - t.y, this.z - t.z, this.w - t.w);
  }
  multiply(t) {
    return new w(this.x * t, this.y * t, this.z * t, this.w * t);
  }
  transform(t) {
    const h = this.x,
      s = this.y,
      e = this.z,
      i = this.w;
    return new w(
      t.m00 * h + t.m10 * s + t.m20 * e + t.m30 * i,
      t.m01 * h + t.m11 * s + t.m21 * e + t.m31 * i,
      t.m02 * h + t.m12 * s + t.m22 * e + t.m32 * i,
      t.m03 * h + t.m13 * s + t.m23 * e + t.m33 * i
    );
  }
}
class o {
  constructor(t, h, s, e, i, m, a, c, l, d, p, F, B, u, f, M) {
    n(this, "m00");
    n(this, "m01");
    n(this, "m02");
    n(this, "m03");
    n(this, "m10");
    n(this, "m11");
    n(this, "m12");
    n(this, "m13");
    n(this, "m20");
    n(this, "m21");
    n(this, "m22");
    n(this, "m23");
    n(this, "m30");
    n(this, "m31");
    n(this, "m32");
    n(this, "m33");
    (this.m00 = t),
      (this.m01 = h),
      (this.m02 = s),
      (this.m03 = e),
      (this.m10 = i),
      (this.m11 = m),
      (this.m12 = a),
      (this.m13 = c),
      (this.m20 = l),
      (this.m21 = d),
      (this.m22 = p),
      (this.m23 = F),
      (this.m30 = B),
      (this.m31 = u),
      (this.m32 = f),
      (this.m33 = M);
  }
  static zero() {
    return new o(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  static identity() {
    return new o(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  add(t) {
    return new o(
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
    return new o(
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
    return new o(
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
      this.m30 * t.m02 + this.m31 * t.m12 + this.m32 * t.m22 + this.m33 * t.m32,
      this.m30 * t.m03 + this.m31 * t.m13 + this.m32 * t.m23 + this.m33 * t.m33
    );
  }
  static scale(t) {
    return new o(t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, t.z, 0, 0, 0, 0, 1);
  }
  static translate(t) {
    return new o(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, t.z, 1);
  }
  static rotateX(t) {
    const h = Math.cos(t),
      s = Math.sin(t);
    return new o(1, 0, 0, 0, 0, h, -s, 0, 0, s, h, 0, 0, 0, 0, 1);
  }
  static rotateY(t) {
    const h = Math.cos(t),
      s = Math.sin(t);
    return new o(h, 0, -s, 0, 0, 1, 0, 0, s, 0, h, 0, 0, 0, 0, 1);
  }
  static rotateZ(t) {
    const h = Math.cos(t),
      s = Math.sin(t);
    return new o(h, -s, 0, 0, s, h, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
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
class R {
  constructor(t) {
    n(this, "vertices");
    this.vertices = t;
  }
}
class I {
  constructor() {
    n(this, "eye");
    n(this, "look");
    n(this, "up");
    n(this, "rotation");
    n(this, "viewMatrix");
    (this.eye = new r(0, 0, 0)),
      (this.look = new r(0, 0, 1)),
      (this.up = new r(0, 1, 0)),
      (this.rotation = new r(0, 0, 0)),
      (this.viewMatrix = o.identity());
  }
  transform(t) {
    return t.transform(this.viewMatrix);
  }
  calculateViewMatrix() {
    const h = this.look
        .rotateX(this.rotation.x)
        .rotateY(this.rotation.y)
        .rotateZ(this.rotation.z)
        .add(this.eye)
        .subtract(this.eye)
        .normalize(),
      s = h.multiply(this.up.dot(h)),
      e = this.up.subtract(s).normalize(),
      i = e.cross(h);
    this.viewMatrix = new o(
      i.x,
      i.y,
      i.z,
      0,
      e.x,
      e.y,
      e.z,
      0,
      h.x,
      h.y,
      h.z,
      0,
      this.eye.x,
      this.eye.y,
      this.eye.z,
      1
    );
  }
  calculatePerspectiveMatrix(t, h, s, e) {
    const i = o.identity(),
      m = Math.tan((t / 2) * (3.141592 / 180));
    return (
      (i.m00 = 1 / m / h),
      (i.m11 = 1 / m),
      (i.m22 = (-2 * s) / (e - s) - 1),
      (i.m23 = -1),
      (i.m32 = -(e * -s) / (e - s)),
      i
    );
  }
}
class g {
  static loadFromFile(t) {
    return new Promise((h, s) => {
      const e = new FileReader();
      (e.onload = i => {
        var a;
        const m = (a = i.target) == null ? void 0 : a.result;
        m ? h(this.parseOBJ(m)) : s(new Error("Failed to load file"));
      }),
        e.readAsText(t);
    });
  }
  static loadFromString(t) {
    return this.parseOBJ(t);
  }
  static parseOBJ(t) {
    const h = t.split(`
`),
      s = [],
      e = [];
    for (const i of h) {
      const m = i
        .trim()
        .split(" ")
        .filter(a => a !== "");
      m[0] === "v"
        ? s.push(new r(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])))
        : m[0] === "f" &&
          e.push(
            new R([
              s[parseInt(m[1]) - 1],
              s[parseInt(m[2]) - 1],
              s[parseInt(m[3]) - 1],
            ])
          );
    }
    return e;
  }
}
class S {
  constructor() {
    n(this, "position");
    n(this, "rotate");
    n(this, "scale");
    (this.position = new r(0, 0, 0)),
      (this.rotate = new r(0, 0, 0)),
      (this.scale = new r(1, 1, 1));
  }
  transform(t) {
    const h = o
      .identity()
      .multiply(o.rotateX(this.rotate.x))
      .multiply(o.rotateY(this.rotate.y))
      .multiply(o.rotateZ(this.rotate.z))
      .multiply(o.scale(this.scale))
      .multiply(o.translate(this.position));
    return t.transform(h);
  }
  setTranslate(t) {
    this.position = t;
  }
  setScale(t) {
    this.scale = t;
  }
  setRotateX(t) {
    this.rotate.x = t;
  }
  setRotateY(t) {
    this.rotate.y = t;
  }
  setRotateZ(t) {
    this.rotate.z = t;
  }
}
class Y {
  constructor(t, h, s) {
    n(this, "el");
    n(this, "width");
    n(this, "height");
    n(this, "frameBuffer");
    n(this, "depthBuffer");
    n(this, "mesh", []);
    n(this, "camera");
    n(this, "world");
    n(this, "angle");
    // private Shade = '.;ox%@';
    n(this, "Shade", "·┼╬░▒▓█");
    (this.el = t),
      (this.width = h),
      (this.height = s),
      (this.frameBuffer = new Array(s + 1)
        .fill(null)
        .map(() => new Array(h + 1).fill(" "))),
      (this.depthBuffer = new Array(s + 1)
        .fill(null)
        .map(() => new Array(h + 1).fill(255))),
      (this.camera = new I()),
      (this.world = new S()),
      (this.angle = 0);
  }
  async loadFromFile(t) {
    this.mesh = await g.loadFromFile(t);
  }
  async loadFromString(t) {
    this.mesh = await g.loadFromString(t);
  }
  run() {
    const h = 16.666666666666668;
    let s = Date.now(),
      e,
      i;
    const m = () => {
      (e = Date.now()),
        (i = e - s),
        i > h &&
          ((s = e - (i % h)),
          this.render(),
          (this.angle += 7e-3),
          this.angle >= 2 * 3.14 && (this.angle -= 2 * 3.14)),
        requestAnimationFrame(m);
    };
    requestAnimationFrame(m);
  }
  render() {
    this.clearFrameBuffer(), this.process(), this.drawFrameBuffer();
  }
  process() {
    (this.camera.eye = new r(0, 0, -5)), this.camera.calculateViewMatrix();
    const t = this.camera.calculatePerspectiveMatrix(
      70,
      this.width / 2 / this.height,
      0.1,
      1e3
    );
    this.world.setRotateX(this.angle),
      this.world.setRotateY(this.angle),
      this.world.setRotateZ(this.angle),
      this.world.setTranslate(new r(0, 0, 0)),
      this.mesh.forEach(h => {
        let s = new w(h.vertices[0].x, h.vertices[0].y, h.vertices[0].z, 1),
          e = new w(h.vertices[1].x, h.vertices[1].y, h.vertices[1].z, 1),
          i = new w(h.vertices[2].x, h.vertices[2].y, h.vertices[2].z, 1);
        (s = this.world.transform(s)),
          (e = this.world.transform(e)),
          (i = this.world.transform(i)),
          (s = this.camera.transform(s)),
          (e = this.camera.transform(e)),
          (i = this.camera.transform(i));
        const m = new r(s.x, s.y, s.z).subtract(new r(e.x, e.y, e.z)),
          a = new r(s.x, s.y, s.z).subtract(new r(i.x, i.y, i.z)),
          c = m.cross(a).normalize(),
          l = new r(s.x, s.y, s.z).add(this.camera.eye);
        if (c.dot(l) >= 0) return;
        (s = this.transformVertex(s, t)),
          (e = this.transformVertex(e, t)),
          (i = this.transformVertex(i, t));
        const d = new r(0, 0, 1).normalize(),
          p = Math.max(0, c.dot(d));
        this.rasterize(
          new w(s.x, s.y, s.z, s.w),
          new w(e.x, e.y, e.z, e.w),
          new w(i.x, i.y, i.z, i.w),
          p
        );
      });
  }
  transformVertex(t, h) {
    const s = t.transform(h);
    return (s.x /= s.w), (s.y /= s.w), (s.z /= s.w), s;
  }
  rasterize(t, h, s, e) {
    const i = this.width / 2,
      m = this.height / 2,
      a = new z(t.x * i + i, -t.y * m + m),
      c = new z(h.x * i + i, -h.y * m + m),
      l = new z(s.x * i + i, -s.y * m + m),
      d = Math.floor(Math.max(0, Math.min(a.x, Math.min(c.x, l.x)))),
      p = Math.floor(Math.max(0, Math.min(a.y, Math.min(c.y, l.y)))),
      F = Math.floor(
        Math.min(this.width, Math.max(a.x, Math.max(c.x, l.x)) + 1)
      ),
      B = Math.floor(
        Math.min(this.height, Math.max(a.y, Math.max(c.y, l.y)) + 1)
      );
    for (let u = p; u < B; u++)
      for (let f = d; f < F; f++)
        if (this.isPointInTriangle(f, u, a, c, l)) {
          const M = u * this.width + f;
          if (M > this.height * this.width || M < 0) continue;
          (t.w + h.w + s.w) / 3 <= this.depthBuffer[u][f] &&
            ((this.frameBuffer[u][f] = this.Shade[
              Math.round((this.Shade.length - 1) * e)
            ]),
            (this.depthBuffer[u][f] = (t.w + h.w + s.w) / 3));
        }
  }
  isPointInTriangle(t, h, s, e, i) {
    const m =
        ((e.y - i.y) * (t - i.x) + (i.x - e.x) * (h - i.y)) /
        ((e.y - i.y) * (s.x - i.x) + (i.x - e.x) * (s.y - i.y)),
      a =
        ((i.y - s.y) * (t - i.x) + (s.x - i.x) * (h - i.y)) /
        ((e.y - i.y) * (s.x - i.x) + (i.x - e.x) * (s.y - i.y)),
      c = 1 - m - a,
      l = m < -1e-3,
      d = a < -1e-3,
      p = c < -1e-3;
    return l == d && d == p;
  }
  drawFrameBuffer() {
    const t = this.frameBuffer
      .map(h => h.join("").replace(/\ /g, "&nbsp;"))
      .join("<br />");
    this.el.innerHTML = t;
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
export { Y as ASCII3DRenderer };
