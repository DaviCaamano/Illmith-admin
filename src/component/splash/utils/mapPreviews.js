//a randomly shuffled list of images to portray on the splash.

import preview1 from '../../../resources/img/Map Preview 1.jpg'
import preview2 from '../../../resources/img/Map Preview 2.jpg'
import preview3 from '../../../resources/img/Map Preview 3.jpg'
import preview4 from '../../../resources/img/Map Preview 4.jpg'

let mapPreview = [
    preview1,
    preview2,
    preview3,
    preview4,
];

/**
 * Randomly shuffle the input array.
 * @param array - An array
 * @returns Input array after having the order of its elements randomized.
 */
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
export default shuffleArray(mapPreview);