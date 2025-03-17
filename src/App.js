import { useState, useEffect } from "react";
// import blue from './assets/blue.png'
// import green from './assets/green.png'
// import pink from './assets/pink.png'
// import teal from './assets/teal.png'
// import violet from './assets/violet.png'
// import yellow from './assets/yellow.png'
import blank from './assets/blank.png'
import ham from './assets/band-ham.png'
import steve from './assets/band-steve.png'
import greg from './assets/band-greg.png'
import matt from './assets/band-matt.png'
import popeye from './assets/popeye.png'
import archie from './assets/archie.png'

const width = 8;
// const plum = 'rgb(152, 114, 132)';
// const teal = 'rgb(117, 185, 190)';
// const sage = 'rgb(208, 214, 181)';
// const pink = 'rgb(249, 181, 172)';
// const rose = 'rgb(238, 118, 116)';
// const goldenrod = 'rgb(214, 206, 131)';

const candyColors = [ham, steve, greg, matt, archie, popeye];

function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
// eslint-disable-next-line
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];

            if (columnOfFour.every(color => currentColorArrangement[color] === decidedColor)) {
                columnOfFour.forEach(color => currentColorArrangement[color] = blank)
                return true;
            }
        }
    }
// eslint-disable-next-line
    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

            if (notValid.includes(i)) continue
            if (rowOfFour.every(color => currentColorArrangement[color] === decidedColor)) {
                rowOfFour.forEach(color => currentColorArrangement[color] = blank)
                return true;
            }
        }
    }
// eslint-disable-next-line
    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            if (columnOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
                columnOfThree.forEach(color => currentColorArrangement[color] = blank)
                return true;
            }
        }
    }
// eslint-disable-next-line
    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

            if (notValid.includes(i)) continue
            if (rowOfThree.every(color => currentColorArrangement[color] === decidedColor)) {
                rowOfThree.forEach(color => currentColorArrangement[color] = blank)
                return true;
            }
        }
    }
// eslint-disable-next-line
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0,1,2,3,4,5,6,7]
            // const isFirstRow = firstRow.includes(i)
        
            if (firstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[randomNumber];
            }
        
                if (currentColorArrangement[i + width] === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = blank;
            }
        }
    }

    const dragStart = (e) => {
        // console.log('dragStart');
        // console.log(e.target);
        setSquareBeingDragged(e.target);
        // squareBeingDragged.addEventListener('mousedown', startDrag, false);
        // squareBeingDragged.addEventListener('touchstart', startDrag, false);
    }

    const dragDrop = (e) => {
        // console.log('dragDrop');
        // console.log(e.target);
        setSquareBeingReplaced(e.target);
        // setSquareBeingReplaced.addEventListener('mousemove', continueDrag, false);
        // setSquareBeingReplaced.addEventListener('touchmove', continueDrag, false);
    }
    
    const dragEnd = (e) => {
        // console.log('dragEnd');
        // console.log(e.target);

        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');
        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour();
        const isARowOfFour = checkForRowOfFour();
        const isAColumnOfThree = checkForColumnOfThree();
        const isARowOfThree = checkForRowOfThree();

        if (squareBeingReplacedId &&
            validMove &&
            (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
            setSquareBeingDragged(null);
            setSquareBeingReplaced(null);
            // setSquareBeingDragged.addEventListener('mouseup', endDrag, false);
            // setSquareBeingDragged.addEventListener('touchend', endDrag, false);
            // setSquareBeingReplaced.addEventListener('mouseup', endDrag, false);
            // setSquareBeingReplaced.addEventListener('touchend', endDrag, false);
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
            setCurrentColorArrangement([...currentColorArrangement]);
        }
    }

    const createBoard = () => {
    const randomColorAssortment = [];
    for (let i = 0; i < width * width; i++) {
        const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
        randomColorAssortment.push(randomColor);
    }
    setCurrentColorArrangement(randomColorAssortment);
    };

    useEffect(() => {
    createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 300);
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    return (
    <div className="app">
        <div className="game">
            {currentColorArrangement.map((color, index) => (
                <img
                    key={index}
                    alt={color}
                    src={color}
                    data-id={index}
                    draggable={true}
                    // onDragStart={dragStart}
                    onTouchStart={dragStart}
                    // onDrop={dragDrop}
                    onTouchMove={dragDrop}
                    // onDragEnd={dragEnd}
                    onTouchEnd={dragEnd}
                    // onDragOver={(e) => e.preventDefault()}
                    // onDragEnter={(e) => e.preventDefault()}
                    // onDragLeave={(e) => e.preventDefault()}
                    onTouchStartCapture={e => e.preventDefault()}
                    onTouchMoveCapture={e => e.preventDefault()}
                    onTouchEndCapture={e => e.preventDefault()}
                />
            ))}
        </div>
    </div>
    );
}

export default App;

// ----------------------------------------------------------------

// Listen for both mousedown and touchstart
// draggableElement.addEventListener('mousedown', startDrag, false);
// draggableElement.addEventListener('touchstart', startDrag, false);

// function startDrag(event) {
//   // Check if it's a mouse or touch event
//   const isTouch = event.type === 'touchstart';

//   // Get the starting coordinates based on the event type
//   let startX = isTouch ? event.touches[0].clientX : event.clientX;
//   let startY = isTouch ? event.touches[0].clientY : event.clientY;

//   // Add event listeners for drag and drop actions on document
//   document.addEventListener('mousemove', continueDrag, false);
//   document.addEventListener('touchmove', continueDrag, false);
//   document.addEventListener('mouseup', endDrag, false);
//   document.addEventListener('touchend', endDrag, false);

//   // Optionally, add the following to prevent scrolling on touchmove
//   if (isTouch) {
//     document.addEventListener('touchmove', function(e) {
//       e.preventDefault();
//     });
//   }

//   function continueDrag(event){
//     let currentX, currentY;

//     if(event.type === 'touchmove'){
//        currentX = event.touches[0].clientX;
//        currentY = event.touches[0].clientY;
//     } else {
//        currentX = event.clientX;
//        currentY = event.clientY;
//     }

//     // Update the dragged element's position based on current coordinates
//     draggableElement.style.transform = `translate(${currentX - startX}px, ${currentY - startY}px)`;
//   }

//   function endDrag(){
//     // Remove event listeners
//     document.removeEventListener('mousemove', continueDrag, false);
//     document.removeEventListener('touchmove', continueDrag, false);
//     document.removeEventListener('mouseup', endDrag, false);
//     document.removeEventListener('touchend', endDrag, false);
//   }
// }