// Mouse Circle

const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px ; left: ${x}px ; opacity:1`;
  mouseDot.style.cssText = `top: ${y}px ; left: ${x}px ; opacity:1`;
};

// End of Mouse Circle

// Animated Circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const z = 100;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    // console.log("x", x);
    // console.log("mX", mX);
    // console.log("moved to the left");
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    // console.log("move upwards");
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  // This value is calculated after the value of x , x always is different from mX
  mX = e.clientX;
  mY = e.clientY;
};

// End Animated Circles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  // console.log("x", x);
  // console.log("y", y);
  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Main Buttom
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    // Get the btn coordinates
    // console.log(e.target.getBoundingClientRect());
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    // console.log("left", left);

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of Main Buttom

//  About Me Text

const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "I am a designer & I create awards winning websites with the best user experiences & I do not talk much, just contact me. :)";
// console.log(Array.from(aboutMeTextContent));
Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});

// End of About Me Text

// Projects
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    // console.log(imgPath);
    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";
  });
});

// Big Project Image

// End of Projects
