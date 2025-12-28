import { Enum, Enums, type Serve, type Shape } from './type/index.ts'
import type { Category, APIMessage } from './type/enum.ts';
import type { ID, int32 } from './type/unit.ts';
import type { CommentResult, CommentPost, ExperimentQuery, ContentSubmitSummary, SubmitExperiment } from './type/shape.ts';

import { Upstream, UpstreamContext } from './upstream.ts'

export class App extends Upstream implements Serve.Server {
  constructor(
    public config: UpstreamContext['auth'],
    upstream: UpstreamContext['upstream'],
  ) {
    super({
      auth: config,
      upstream,
    })
  }
  Result<
    Data extends unknown = unknown, Message extends APIMessage | '' = APIMessage | '', Status extends int32 = int32
  >(Data: Data, Message: Message = '' as never, Status: Status = (Message ? 500 : 200) as never): Serve.Result<Data, Message, Status> {
    // @ts-ignore
    return { Data, Status, Message }
  }
  override async Homepage(): Promise<Serve.Result<Shape.Homepage>> {
    return this.Result({
      ID: '',
      Identifier: 'Homepage',
      IsDevelopment: !0,
      IsNavigation: !0,
      Language: 'Chinese',
      Blocks: [] as never
    } satisfies Shape.Homepage)
  }
  override Authenticate(q: Serve.Param<{
    Device: Shape.Device; Login?: string; Password?: string; Statistic: Shape.Statistic; Version: int32;
  }>): Promise<Serve.Result<Shape.Sync>> {
    return super.Authenticate(q)
  }
  override GetLibrary(q: Serve.Param<{ Identifier: string; Language: string; }>): Promise<Serve.Result<Shape.Library>> {
    return super.GetLibrary(q)
  }
  override async GetUser(q: Serve.Param<{ ID: ID; }>): Promise<Serve.Result<Shape.RelationList>> {
    return super.GetUser(q)
  }
  override GetWorkspace(q: Serve.Param<{ ContentID: ID; Language: string; }>): Promise<Serve.Result<Shape.Workspace>> {
    return super.GetWorkspace(q)
  }
  override ModifyInformation(q: Serve.Param<{ Field: string; Target: string; }>): Promise<Serve.Result<Shape.RelationList>> {
    return super.ModifyInformation(q)
  }
  override PostComment(q: Serve.Param<CommentPost>): Promise<Serve.Result<CommentResult>> {
    return super.PostComment(q)
  }
  override QueryExperiments(q: Serve.Param<{ Query: ExperimentQuery; }>): Promise<Serve.Result<{ $values: Shape.Summary[]; }>> {
    return super.QueryExperiments(q)
  }
  override RemoveComment(q: Serve.Param<{ CommentID: ID; TargetType: Category; }>): Promise<Serve.Result<string>> {
    return super.RemoveComment(q)
  }
  override Rename(q: Serve.Param<{ Target: string; UserID: ID; }>): Promise<Serve.Result<Shape.RelationList>> {
    return super.Rename(q)
  }
  override SubmitExperiment(q: Serve.Param<{ Request: { Extension: string; FileSize: int32; }; Summary: ContentSubmitSummary; }>): Promise<Serve.Result<SubmitExperiment>> {
    return super.SubmitExperiment(q)
  }
  override SyncActivities(q: Serve.Param<{ ContentID: ID; Language: string; }>): Promise<Serve.Result<Shape.Sync>> {
    return super.SyncActivities(q)
  }
  override Appoint(q: Serve.Param<{ Length: int32; Reason: string; TargetID: ID; Type: string }>): Promise<Serve.Result<string>> {
    return super.Appoint(q)
  }
}
if(import.meta.main){
  await new App({
    AppName:'physics-lab',
    Version:2401,
  },{
    Href:'https://nlm-api-cn.turtlesim.com/',
    Headers:[
      ["x-api-authCode",""],
      ["x-api-token",""],
      ["x-api-version","2411"],
      // ['X']
    ]
  })
  .QueryExperiments({
    Query:{
      Languages:[],
      Tags:[],
      Take:20,
      Category:'Discussion',
    }
  }).then(r=>console.log(r))
}