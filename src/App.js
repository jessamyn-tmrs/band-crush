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
    }

    const dragDrop = (e) => {
        // console.log('dragDrop');
        // console.log(e.target);
        setSquareBeingReplaced(e.target);
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
                    onDragStart={dragStart}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                />
            ))}
        </div>
    </div>
    );
}

export default App;
