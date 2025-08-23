export const areSamePayload = (
  payload: Record<string, unknown>,
  existingPayload: Record<string, unknown>
) =>
  Object.keys(payload).every((key) => {
    return payload[key] === existingPayload[key];
  });
