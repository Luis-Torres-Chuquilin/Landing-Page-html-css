const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

// Mouse Circle
const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px ; left: ${x}px`;
  mouseDot.style.cssText = `top: ${y}px ; left: ${x}px`;
};

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  //   console.log(x);
  mouseCircleFn(x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});
