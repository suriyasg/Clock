// 1. Select the container digits
const first_digit_div = document.getElementById('first');
const second_digit_div = document.getElementById('second');
const third_digit_div = document.getElementById('third');
const fourth_digit_div = document.getElementById('fourth');
const fifth_digit_div = document.getElementById('fifth');
const sixth_digit_div = document.getElementById('sixth');

const meridiem = document.getElementById('meridiem');

// 2. Create a function to update a specific digit
// This modifies the classes inside the container you pass to it

function getAllBars(digitContainer) {
    // Select elements scoped ONLY to this digit container
    const topHori = digitContainer.querySelector(".top-hori");
    const topVert = digitContainer.querySelector(".first-vert");
    const midHori = digitContainer.querySelector(".middle-hori");
    const botVert = digitContainer.querySelector(".second-vert");
    const botHori = digitContainer.querySelector(".bottom-hori");

    return [topHori, topVert, midHori, botVert, botHori]
}

const numberMap = {
    0: { top: true,  topV: "double", mid: false, botV: "double", bot: true  },
    1: { top: false, topV: "right",  mid: false, botV: "right",  bot: false },
    2: { top: true,  topV: "right",  mid: true,  botV: "left",   bot: true  },
    3: { top: true,  topV: "right",  mid: true,  botV: "right",  bot: true  },
    4: { top: false, topV: "double", mid: true,  botV: "right",  bot: false },
    5: { top: true,  topV: "left",   mid: true,  botV: "right",  bot: true  },
    6: { top: true,  topV: "left",   mid: true,  botV: "double", bot: true  },
    7: { top: true,  topV: "right",  mid: false, botV: "right",  bot: false },
    8: { top: true,  topV: "double", mid: true,  botV: "double", bot: true  },
    9: { top: true,  topV: "double", mid: true,  botV: "right",  bot: true  }
};

function setVerticalStyle(element, styleName) {
    // 1. Reset: Remove all directional classes
    element.classList.remove("doubleVerticalLine", "leftVerticalLine", "rightVerticalLine");
    
    // 2. Set: Add the correct class based on config
    if (styleName === "double") {
        element.classList.add("doubleVerticalLine");
    } else if (styleName === "left") {
        element.classList.add("leftVerticalLine");
    } else if (styleName === "right") {
        element.classList.add("rightVerticalLine");
    }
}

function setHorizontalVisibility(element, isVisible) {
    if (isVisible) {
        element.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
    }
}

function setDigit(digitContainer, number) {
    const config = numberMap[number];
    const [topHori, topVert, midHori, botVert, botHori] = getAllBars(digitContainer);

    // Set Horizontals (Visibility)
    setHorizontalVisibility(topHori, config.top);
    setHorizontalVisibility(midHori, config.mid);
    setHorizontalVisibility(botHori, config.bot);

    // Set Verticals (Shape)
    setVerticalStyle(topVert, config.topV);
    setVerticalStyle(botVert, config.botV);
}

function setMeridiem(meridiem, currentMeridiem) {
    meridiem.innerText = currentMeridiem;
}

function startClock() {
    const now = new Date();
    
    // 1. Get Hours and Minutes
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    setMeridiem(meridiem, hours >= 12 ? 'PM' : 'AM')


    // 2. Split Hours (e.g., 12 -> 1 and 2)
    const h1 = Math.floor(hours / 10);
    const h2 = hours % 10;

    // 3. Split Minutes (e.g., 05 -> 0 and 5)
    const m1 = Math.floor(minutes / 10);
    const m2 = minutes % 10;
    
    // 4. Split Seconds (e.g., 05 -> 0 and 5)
    const s1 = Math.floor(seconds / 10);
    const s2 = seconds % 10;

    // 4. Update the DOM using your setDigit function
    setDigit(first_digit_div, h1);
    setDigit(second_digit_div, h2);
    setDigit(third_digit_div, m1);
    setDigit(fourth_digit_div, m2);
    setDigit(fifth_digit_div, s1);
    setDigit(sixth_digit_div, s2);
}

// Run the clock immediately so we don't wait 1 second for the first update
startClock();

// Update every 1000 milliseconds (1 second)
setInterval(startClock, 1000);