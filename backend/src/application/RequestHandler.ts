import {Request, RequestExecutor} from "smartcafe-common/dist/application/Request";
import {Repository} from "../repository/Repository";

export abstract class RequestHandler<Req extends Request<Resp>, Resp> implements RequestExecutor<Req, Resp> {

    protected constructor(readonly repository: Repository) {
    }

    abstract execute(request: Req): Promise<Resp>
}