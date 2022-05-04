import { GameModel } from "../models/game";
import { TicTacToeModel } from "../models/game-models/TicTacToe";
import { GameType } from "../models/game_users_info_model";
import { PlayerModel } from "../models/player";
import { UserModel } from "../models/user";
import * as crypto from "crypto";

type GameClass = {new(gameType: GameType, gameId: string, maxUserCount?:number):  GameModel};

const gameTypeToClass: Map<GameType, GameClass> = new Map<GameType, GameClass>();
gameTypeToClass.set(GameType.TicTacToe, TicTacToeModel);

export class GameService {
    private gamesList: GameModel[];
    private playersList: PlayerModel[];

    constructor() {
        this.gamesList = [];
        this.playersList = [];
    }

    public createGame(creator:UserModel, gameType:GameType, userCount?:number, creatorMoveFirst:boolean=true) {
        // create game
        const GameClass = gameTypeToClass.get(gameType);
        if (!GameClass) throw new Error("GameType does not exist or it does not has a according game type.");

        const gameId = crypto.randomBytes(64).toString("hex");  // game id generation
        const newGame = new GameClass(gameType, gameId, userCount);
        
        // create a player for user
        const creatorPlayer = new PlayerModel(creator.getUserId(), creatorMoveFirst, gameId);
    }
}