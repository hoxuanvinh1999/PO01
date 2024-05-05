document.addEventListener("DOMContentLoaded", function() {
  const barElements = document.querySelectorAll('[id^="bar"]');
  const numBars = barElements.length;
  const bars = [];
  const submenus = [];
  const isBarOpen = [];

  for (let i = 1; i <= numBars; i++) {
    console.log(i)
    bars[i] = document.getElementById("bar" + i);
    submenus[i] = document.getElementById("submenu" + i);
    isBarOpen[i] = false;
  }

  function showSubmenu(barIndex) {
    console.log("Show submenu " + barIndex);
    submenus[barIndex].style.display = "block";
    const submenuHeight = submenus[barIndex].offsetHeight;
    let move_distance = submenuHeight;
  
    // Add the heights of submenus of open upper bars
    for (let i = barIndex - 1; i >= 1; i--) {
      if (isBarOpen[i]) {
        const upperSubmenuHeight = submenus[i].offsetHeight;
        move_distance += upperSubmenuHeight;
      }
    }
  
    for (let i = barIndex + 1; i <= numBars; i++) {
      let move_down_distance = move_distance
      for (let j = barIndex + 1; j < i; j++) {
        if (isBarOpen[j]) {
          // If the bar is open, add its submenu height to the move_up_distance
          move_down_distance += submenus[j].offsetHeight;
        }
      }
      // Translate the under bars with the adjusted move_distance
      bars[i].style.transform = `translateY(${move_down_distance}px)`;
    }
  
    isBarOpen[barIndex] = true;
  }
  

  function hideSubmenu(barIndex) {
    console.log("Hide submenu " + barIndex);
    submenus[barIndex].style.display = "none";
    let move_distance = 0;
  
    for (let i = 1; i < barIndex; i++) {
      if (isBarOpen[i]) {
        move_distance += submenus[i].offsetHeight;
      }
    }
  
  // Translate the under bars
  for (let i = barIndex + 1; i <= numBars; i++) {
    let move_up_distance = move_distance;
    // Check each bar between barIndex + 1 and i - 1
    for (let j = barIndex + 1; j < i; j++) {
      if (isBarOpen[j]) {
        // If the bar is open, add its submenu height to the move_up_distance
        move_up_distance += submenus[j].offsetHeight;
      }
    }
    bars[i].style.transform = `translateY(${move_up_distance}px)`;
  }

    isBarOpen[barIndex] = false;
  }
  

  for (let i = 1; i <= numBars; i++) {
    bars[i].addEventListener("click", function(event) {
      if (!isBarOpen[i]) {
        showSubmenu(i);
      } else {
        hideSubmenu(i);
      }
      event.stopPropagation();
    });
  }

  document.addEventListener("click", function() {
    for (let i = 1; i <= numBars; i++) {
      if (isBarOpen[i]) {
        hideSubmenu(i);
      }
    }
  });

  for (let i = 1; i <= numBars; i++) {
    submenus[i].addEventListener("click", function(event) {
      event.stopPropagation();
    });
  }
});
