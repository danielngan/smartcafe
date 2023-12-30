export interface Request<Resp> {

}

export interface RequestExecutor {
    execute <T extends Request<Resp>, Resp>(request: T): Promise<Resp>
}