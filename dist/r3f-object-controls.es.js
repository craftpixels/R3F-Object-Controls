import { useThree as U, useFrame as B } from "@react-three/fiber";
import { useState as P, useRef as l, useEffect as R } from "react";
import { Euler as I, Raycaster as F, Vector2 as V, MathUtils as E } from "three";
function A({
  object: s,
  orbitControl: u,
  dampingFactor: g = 0.1,
  maxRotationX: O = Math.PI / 2,
  minRotationX: X = -Math.PI / 2,
  enableXRotation: m = !0,
  enableYRotation: h = !0
}) {
  const { gl: v, camera: D } = U(), [c, d] = P(!1), [y, S] = P({ x: 0, y: 0 }), f = l(new I()), L = l(new I()), w = l(new F()), p = l(new V()), Y = (e, n) => {
    const r = v.domElement.getBoundingClientRect();
    return p.current.x = (e - r.left) / r.width * 2 - 1, p.current.y = -((n - r.top) / r.height) * 2 + 1, w.current.setFromCamera(p.current, D), w.current.intersectObject(s.current, !0).length > 0;
  }, x = (e, n) => {
    Y(e, n) && (d(!0), S({ x: e, y: n }), s.current && f.current.copy(s.current.rotation));
  }, M = (e, n) => {
    if (!c || !s.current) return;
    const r = e - y.x, o = n - y.y, i = m ? f.current.x + o * 0.01 : s.current.rotation.x, a = h ? f.current.y + r * 0.01 : s.current.rotation.y;
    L.current.set(i, a, 0);
  };
  return R(() => {
    const e = v.domElement;
    e.style.cursor = c ? "grabbing" : "default";
    const n = (t) => x(t.clientX, t.clientY), r = (t) => M(t.clientX, t.clientY), o = () => d(!1), i = (t) => {
      t.touches.length === 1 && (t.preventDefault(), x(t.touches[0].clientX, t.touches[0].clientY));
    }, a = (t) => {
      t.touches.length === 1 && (t.preventDefault(), M(t.touches[0].clientX, t.touches[0].clientY));
    }, T = () => d(!1);
    return e.addEventListener("mousedown", n), e.addEventListener("mousemove", r), e.addEventListener("mouseup", o), e.addEventListener("touchstart", i, { passive: !1 }), e.addEventListener("touchmove", a, { passive: !1 }), e.addEventListener("touchend", T), () => {
      e.removeEventListener("mousedown", n), e.removeEventListener("mousemove", r), e.removeEventListener("mouseup", o), e.removeEventListener("touchstart", i), e.removeEventListener("touchmove", a), e.removeEventListener("touchend", T);
    };
  }, [v, c, m, h]), R(() => {
    u && u.current && (u.current.enabled = !c);
  }, [c, u]), B(() => {
    const e = s.current;
    if (!e) return;
    const n = e.rotation, r = L.current, o = E.clamp(r.x, X, O);
    m && (n.x = E.lerp(n.x, o, g)), h && (n.y = E.lerp(n.y, r.y, g));
  }), null;
}
export {
  A as ObjectControls
};
