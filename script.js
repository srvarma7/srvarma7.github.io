console.log("hello");


// document.getElementById('leftBracket').style.paddingLeft = "100px";
// document.getElementById('centerBracket').style.paddingLeft = "10px";
// document.getElementById('rightBracket').style.paddingLeft = "100px";

let viewWidth = window.innerWidth;
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
    var totalScrolled = (winScroll / height) * 100;
    // Overall scroll progress
    document.getElementById("progressBar").style.width = totalScrolled + "%";

    let emptyContainer = document.getElementById("topScreenSizeEmptyContainer")
    let emptPer = getViewPercentage(emptyContainer)
    // console.log(emptPer);

    let emptyContainer2 = document.getElementById("bottomScreenSizeEmptyContainer")
    let emptPer2 = getViewPercentage(emptyContainer2)
    // console.log(emptPer2);

    if (totalScrolled > 50) {
        moveLeftRightArrows(emptPer2)
    } else {
        moveLeftRightArrows(emptPer)
    }
}

function moveLeftRightArrows(percentage) {
    let leftBracket = document.getElementById("leftBracket")
    let rightBracket = document.getElementById("rightBracket")

    let centerBracket = document.getElementById("centerBracket")

    var tranform = ((100 - percentage)/100) * viewWidth/2.5
    // console.log("tranform " + tranform);
    if ((tranform == viewWidth/4) && (percentage > 99)) {
        tranform = 0
    }
    leftBracket.style.transform = 'scaleY(1.5) translateX(' + -tranform + 'px)';
    rightBracket.style.transform = 'scaleY(1.5) translateX(' + tranform + 'px)';
    
    var scale = 1 - ((100 - percentage*1.5)/100);
    console.log(scale);
    
    centerBracket.style.transform = 'translateY(-5px) scale(' + scale + ')';
}

function getViewPercentage(element) {
    const viewport = {
      top: window.scrollY,
      bottom: window.scrollY + window.innerHeight
    };
  
    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
      top: elementBoundingRect.y + window.scrollY,
      bottom: elementBoundingRect.y + elementBoundingRect.height + window.scrollY
    };
  
    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
      return 0;
    }
  
    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
      return 100;
    }
  
    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
      return 100;
    }
  
    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;
  
    if (elementPos.top < viewport.top) {
      elementHeightInView = elementHeight - (window.scrollY - elementPos.top);
    }
  
    if (elementPos.bottom > viewport.bottom) {
      elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }
  
    const percentageInView = (elementHeightInView / window.innerHeight) * 100;
  
    return Math.ceil(percentageInView);
  }