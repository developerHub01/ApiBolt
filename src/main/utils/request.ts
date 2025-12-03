import { RequestListItemInterface } from "@/shared/types/request-response.types";

export const findSelectedRequestIds = (
  id: string,
  requestTree: Record<string, RequestListItemInterface>
) => {
  const selectedRequestIds = new Set<string>([]);

  const trackChildren = (id: string) => {
    const request = requestTree[id];
    if (!request) return;
    selectedRequestIds.add(id);
    if (!request.children || !Array.isArray(request.children)) return;
    for (const childId of request.children) {
      trackChildren(childId);
    }
  };

  trackChildren(id);

  return selectedRequestIds;
};
