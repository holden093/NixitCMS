let maintenanceMode = false

export function isInMaintenanceMode(): boolean {
  return maintenanceMode
}

export function setMaintenanceMode(on: boolean): void {
  maintenanceMode = on
}
