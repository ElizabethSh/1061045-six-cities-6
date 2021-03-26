import {NameSpace} from "../root-reducer";

export const getActiveCard = (state) => state[NameSpace.CARD].activeCard;
