export interface Request<Resp> {

}

export interface RequestExecutor<Req extends Request<Resp>, Resp> {
    execute(request: Req): Promise<Resp>
}