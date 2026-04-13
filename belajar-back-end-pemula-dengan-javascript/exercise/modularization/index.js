import Tiger from './Tiger.js';
import Wolf from './Wolf.js';

const fighting = (tiger, wolf) => {
    if (tiger.strength > wolf.strength) {
        tiger.growl();
        return;
    }
    else if (tiger.strength < wolf.strength) {
        wolf.howl();
        return;
    }
    else {
        console.log('Tiger and Wolf have same strenght')
    }
}

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);