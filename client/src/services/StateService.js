import {BehaviorSubject} from 'rxjs';

class StateService {

    constructor () {
        this.showSelectedPokemonDetails$ = new BehaviorSubject();
    }

    showSelectedPokemonDetail = () => {
        return this.showSelectedPokemonDetails$;
    };

    emitShowSelectedPokemonDetail = e => {
        this.showSelectedPokemonDetails$.next(e);
    };

}

export default new StateService();