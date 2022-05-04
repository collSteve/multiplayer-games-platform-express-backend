import { GameMove, GameType } from "./game_users_info_model";
import { PlayerModel } from "./player";

export enum GameState {
    WaitForPlayersToJoin,
    WaitToStart, // player loaded
    Playing,
    Ended
}

export abstract class GameModel {
    public static readonly DEFAULT_MAX_USER_COUNT = 2; 
    private gameType: GameType;
    private gameId:string;
    private players: Set<PlayerModel>;
    private maxUserCount: number;
    private userCount: number = 0;

    private gameState: GameState;

    constructor(gameType: GameType, gameId: string, maxUserCount:number = GameModel.DEFAULT_MAX_USER_COUNT) {
        this.gameType = gameType;
        this.gameId = gameId;
        this.maxUserCount = maxUserCount;

        this.players = new Set<PlayerModel>();

        this.gameState = GameState.WaitForPlayersToJoin;
    }

    public addUser(player:PlayerModel) {
        if (this.userCount>=this.maxUserCount) {
            throw new Error("Fail to add new player to game: reached max user count in game."); // fail to add
            return;
        }    

        if (this.gameState != GameState.WaitForPlayersToJoin) {
            throw new Error("Fail to add new player to game: game is not waiting for players to join");
            return;
        }

        this.players.add(JSON.parse(JSON.stringify(player)));
        this.userCount++;

        if (this.userCount >= this.maxUserCount) {
            this.gameState = GameState.WaitToStart;
        }
    }

    public getGameId() {
        return this.gameId;
    }
    
    public abstract isMoveValid(move: GameMove): boolean

    public abstract updateGame(move: GameMove): void 

    public abstract isGameEnded(): boolean
}