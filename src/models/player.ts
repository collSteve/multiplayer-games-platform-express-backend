import { PlayerStatus } from "./player-status";

export abstract class PlayerModel<PlayerGameInfoType> {
    private userId: string;
    private currentMove: boolean;
    private gameId: string|null;

    constructor(userId:string, currentMove:boolean=false, gameId:string|null=null) {
        this.userId = userId;
        this.currentMove = currentMove;
        this.gameId = gameId;
    }

    public isCurrentMove() {
        return this.currentMove;
    }

    public setGameId(gameId:string) {
        this.gameId = gameId;
    }

    public abstract getPlayerStatus():PlayerStatus<PlayerGameInfoType>
}