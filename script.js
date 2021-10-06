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
      // console.log("circle.style", circle.style);
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

// Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

const progressBarFn = (bigImgWrapper = false) => {
  let pageHeight = 0;
  let scrolledPortion = 0;
  const pageViewporHeight = window.innerHeight;

  if (!bigImgWrapper) {
    // console.log("pageViewporHeight", pageViewporHeight);
    pageHeight = document.documentElement.scrollHeight;
    // console.log("pageHeight", pageHeight);
    scrolledPortion = window.pageYOffset;
    // console.log("scrolledPortion", scrolledPortion);
  } else {
    pageHeight = bigImgWrapper.firstElementChild.scrollHeight;
    scrolledPortion = bigImgWrapper.scrollTop;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewporHeight)) * 360;
  // console.log(scrolledPortionDegree);

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
  });

  if (scrolledPortionDegree >= 180) {
    halfCircles[0].style.transform = "rotate(180deg)";
    halfCircleTop.style.opacity = "0";
  } else {
    halfCircleTop.style.opacity = "1";
  }

  const scrollBool = scrolledPortion + pageViewporHeight === pageHeight;

  console.log(scrollBool);

  // Progress Bar Click
  progressBar.onclick = (e) => {
    e.preventDefault();

    if (!bigImgWrapper) {
      // console.log("sections", sections);
      const sectionPositions = Array.from(sections).map((section) => {
        // console.log("scrolledPortion", scrolledPortion);
        // console.log(
        //   "section.getBoundingClientRect().top",
        //   section.getBoundingClientRect().top
        // );
        return scrolledPortion + section.getBoundingClientRect().top;
      });

      const position = sectionPositions.find((sectionPositions) => {
        return sectionPositions > scrolledPortion;
      });
      // console.log("scrolledPortion", scrolledPortion);
      // console.log("sectionPositions", sectionPositions);
      scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
      console.log("position", position);
    } else {
      scrollBool
        ? bigImgWrapper.scrollTo(0, 0)
        : bigImgWrapper.scrollTo(0, bigImgWrapper.scrollHeight);
    }
  };

  // End Progres Bar Click

  // Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
};
progressBarFn();
// End of Progress Bar

//  Navigation

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollFn = () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }

  document.addEventListener("scroll", scrollFn);

  progressBarFn();
};

document.addEventListener("scroll", scrollFn);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});

// // End of Navigation

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
const projectHidenBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
    // console.log(
    //   "project.firstElementChild.style",
    //   project.firstElementChild.style
    // );
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
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

    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHidenBtn.classList.add("change");

    projectHidenBtn.onclick = () => {
      projectHidenBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      progressBarFn();
    };
  });

  // End of Big Project Image

  // if (i >= 6) {
  //   project.style.cssText = "display: none ; opacity: 0 ";
  // }
  i >= 6 && (project.style.cssText = "display: none ; opacity: 0");

  // Projects Button
  const section3 = document.querySelector(".section-3");
  const projectsBtn = document.querySelector(".projects-btn");
  const projectsBtnText = document.querySelector(".projects-btn span");
  let showHideBool = true;

  const showProjects = (project, i) => {
    setTimeout(() => {
      project.style.display = "flex";
      section3.scrollIntoView({ block: "end" });
    }, 600);
    setTimeout(() => {
      project.style.opacity = "1";
    }, i * 200);
  };

  const hideProjects = (project, i) => {
    setTimeout(() => {
      project.style.display = "none";
      section3.scrollIntoView({ block: "end" });
    }, 1200);
    setTimeout(() => {
      project.style.opacity = "0";
    }, i * 100);
  };

  projectsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

    showHideBool
      ? (projectsBtnText.textContent = "Show Less")
      : (projectsBtnText.textContent = "Show More");

    projects.forEach((project, i) => {
      i >= 6 &&
        (showHideBool ? showProjects(project, i) : hideProjects(project, i));
    });
    showHideBool = !showHideBool;
  });

  // projectsBtn.addEventListener("click", (e) => {
  //   e.preventDefault();

  //   // console.log(projectsBtn.firstElementChild.nextElementSibling);
  //   projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  //   projects.forEach((project, i) => {
  //     if (i >= 6) {
  //       if (showHideBool) {
  //         setTimeout(() => {
  //           project.style.display = "flex";
  //           section3.scrollIntoView({ block: "end" });
  //         }, 600);
  //         setTimeout(() => {
  //           project.style.opacity = "1";
  //         }, i * 200);

  //         projectsBtnText.textContent = "Show Less";
  //       } else {
  //         setTimeout(() => {
  //           project.style.display = "none";
  //           section3.scrollIntoView({ block: "end" });
  //         }, 1200);
  //         setTimeout(() => {
  //           project.style.opacity = "0";
  //         }, i * 100);
  //         projectsBtnText.textContent = "Show More";
  //       }
  //     }
  //   });
  //   showHideBool = !showHideBool;
  // });
  // End of Projects Buttom
});

// End of Projects

// Section 4

document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    // console.log("rightPosition", rightPosition);

    service.firstElementChild.style.right = rightPosition;
    // console.log("service.firstElementChild", service.firstElementChild.style);
  });
});

// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });
});

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Talk";
      formHeading.style.opacity = "1";
    }, 300);
  });
});
// End of Form

// Slideshow

const slideshow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon = slideshow.children[3];

  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);

    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);

// End of Slideshow

// End of Section 5
