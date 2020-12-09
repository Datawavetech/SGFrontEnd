// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const accessStatus = {
    canAdmin: currentUser?.role === "chain_admin",
    canAudit: currentUser?.role === "chain_audit",
    canUserOrAdmin: (currentUser?.role === "chain_user" || currentUser?.role === "chain_admin"),
    checkPermission: (route: { path: string }) => {
      return currentUser?.permissions?.includes(route.path);
    },
    checkUri: (uri: string) => {
      return currentUser?.permissions?.includes(uri);
    },
    token: currentUser?.token
  }
  //alert(`AccessStatus: ${JSON.stringify(accessStatus)}`)
  console.log(`AccessStatus: ${JSON.stringify(accessStatus)}`)
  return accessStatus;
}
