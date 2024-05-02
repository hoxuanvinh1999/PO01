document.addEventListener('DOMContentLoaded', function () {
    const bars = document.querySelectorAll('.bar');
  
    bars.forEach(bar => {
      const submenuId = bar.dataset.submenu;
      const submenu = document.getElementById(submenuId);
  
      bar.addEventListener('click', function () {
        const isOpen = bar.dataset.submenuOpen === 'true';
        bar.dataset.submenuOpen = isOpen ? 'false' : 'true';
        updateSubmenuVisibility(bar, submenu);
      });
    });
  
    function updateSubmenuVisibility(bar, submenu) {
      const isOpen = bar.dataset.submenuOpen === 'true';
      submenu.style.display = isOpen ? 'block' : 'none';
  
      const followingBars = bar.nextElementSibling;
      const transitionDuration = '0.3s'; // Adjust transition duration as needed (in seconds)
  
      if (isOpen) {
        // Adjust bar positions when submenu opens (same as before)
        const submenuHeight = submenu.clientHeight;
        while (followingBars) {
          followingBars.style.marginTop = submenuHeight + 'px';
          followingBars.style.transition = `margin-top ${transitionDuration} ease-in-out`;
          followingBars = followingBars.nextElementSibling;
        }
      } else {
        // Adjust bar positions back to normal when submenu closes with animation
        while (followingBars) {
          followingBars.style.marginTop = '0px';
          followingBars.style.transition = `margin-top ${transitionDuration} ease-in-out`;
          followingBars = followingBars.nextElementSibling;
        }
      }
    }
  });
  