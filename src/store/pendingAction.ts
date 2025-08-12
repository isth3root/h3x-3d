type PendingAction = {
  type: 'like';
  payload: string; // productId
} | null;

let pendingAction: PendingAction = null;

export const setPendingAction = (action: PendingAction) => {
  pendingAction = action;
};

export const getPendingAction = (): PendingAction => {
  return pendingAction;
};

export const clearPendingAction = () => {
  pendingAction = null;
};
