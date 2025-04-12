import { BadgeInfo, Badges, ChatUserstate } from "tmi.js";

export enum UserType {
    MODERATOR = "mod",
    GLOBAL_MOD = "global_mod",
    ADMIN = "admin",
    STAFF = "staff",
}

export class TMIMessageEvent {
    channel: string;
    userstate: ChatUserstate; 
    message: string; 
    self: boolean;
    usertype: UserType | undefined;

    constructor(channel: string, userstate: ChatUserstate, message: string, self: boolean) {
        this.channel = channel;
        this.message = message;
        this.userstate = userstate;
        this.self = self;
        this.usertype = this.getUserType();
    }

    getCommand(): string | undefined {
        const command = this.message.split(" ")[0];
        return command.startsWith("!") ? command.slice(1) : undefined;
    }

    isSelf(): boolean {
        return this.self;
    }

    isChat(): boolean {
        return this.userstate["message-type"] === "chat";
    }

    getUsername(): string {
        return this.userstate.username!;
    }

    getUserType(): UserType | undefined {
        if (this.usertype) return this.usertype; // Return cached usertype if available
        if (this.userstate.mod) return UserType.MODERATOR;
        if (this.userstate["user-type"] === "global_mod") return UserType.GLOBAL_MOD;
        if (this.userstate["user-type"] === "admin") return UserType.ADMIN;
        if (this.userstate["user-type"] === "staff") return UserType.STAFF;
    }

    isMod(): boolean {
        return this.userstate.mod || this.userstate["user-type"] === "global_mod";
    }

    isSubscriber(): boolean {
        return this.userstate.subscriber!;
    }

    getDisplayName(): string {
        return this.userstate["display-name"] || this.userstate.username!;
    }

    getUserId(): string {
        return this.userstate.userId!;
    }

    getColor(): string | undefined {
        return this.userstate.color;
    }

    getBadges(): Badges | undefined {
        return this.userstate.badges;
    }

    getBadgeInfo(): BadgeInfo | undefined {
        return this.userstate.badges;
    }
}