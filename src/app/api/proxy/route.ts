import {
  APIPayloadBody,
  fetchApiUniformError,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { sendRequest } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: APIPayloadBody = await request.json();

  try {
    const apiRes = await sendRequest(body);

    const responseData = {
      headers: apiRes.headers,
      status: apiRes.status,
      statusText: apiRes.statusText,
      cookies: request.cookies.getAll(),
      data: apiRes.data,
    };
    
    return new Response(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    const responseData = fetchApiUniformError(error);
 
    return Response.json(JSON.stringify(responseData), { status: 500 });
  }
};
