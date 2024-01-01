import {Request} from "smartcafe-common/dist/application/Request";
import {Repository} from "../repository/Repository";

export abstract class RequestHandler<Req extends Request<Resp>, Resp> {

    protected constructor(readonly repository: Repository) {
    }

    abstract execute(request: Req): Promise<Resp>
}