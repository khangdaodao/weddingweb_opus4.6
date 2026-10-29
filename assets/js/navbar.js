/**
 * ==============================================================================
 * BOTTOM NAVBAR CONTROLLER
 * ==============================================================================
 * Xử lý hiển thị thanh điều hướng sau khi mở thiệp và cuộn mượt đến các section.
 */

function initNavbar() {
  const navbar = document.getElementById("bottomNavbar");
  const navItems = document.querySelectorAll(".nav-item");

  if (!navbar) return;

  function showNavbar() {
    navbar.classList.add("visible");
  }

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  return {
    showNavbar
  };
}

