import { TeamsService } from './teams.service';
export declare class TeamsController {
    private teamsService;
    constructor(teamsService: TeamsService);
    getUserTeams(req: any): Promise<import("../entities/team.entity").Team[]>;
}
