// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const accessStatus = {
    canAdmin: currentUser?.role === 2,
    canAudit: currentUser?.role === 3,
    canUserOrAdmin: (currentUser?.role === 1 || currentUser?.role === 2),
    token: currentUser?.token
  }
  //alert(`AccessStatus: ${JSON.stringify(accessStatus)}`)
  console.log(`AccessStatus: ${JSON.stringify(accessStatus)}`)
  return accessStatus;
}
