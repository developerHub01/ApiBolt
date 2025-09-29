export interface HttpStatusInterface {
  reason: string;
  description: string;
  editedReason: string;
  editedDescription: string;
}

export interface HttpStatusSingleInterface extends HttpStatusInterface {
  code: string;
}

export interface HttpStatusListInterface {
  [code: string]: HttpStatusInterface;
}

export interface HttpStatusUpdatePayloadInterface
  extends Partial<
    Pick<HttpStatusInterface, "editedReason" | "editedDescription">
  > {
  code: string;
}
