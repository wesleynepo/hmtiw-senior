export interface ClockingEventByActiveUserQueryResponse {
  count: number
  totalPages: number
  result: Result[]
}

export interface Result {
  id: string
  dateEvent: Date
  timeEvent: string
  cnpj: string
  pis: string
  createdAt: string
  appVersion: AppVersion
  platform: Platform
  device: Device
  geolocation: Geolocation
  employee: Employee
  readed: boolean
  fenceState: FenceState
  use: number
  appointmentId: string
  mode: Mode
  online: boolean
  signature: string
  signatureVersion: number
  signatureStatus: SignatureStatus
  _discriminator: ResultDiscriminator
}

export enum ResultDiscriminator {
  ClockingEvent = 'clockingEvent'
}

export enum AppVersion {
  The291 = '2.9.1'
}

export interface Device {
  id?: string
  name?: string
  model?: string
  imei?: string
  status?: string
  _discriminator?: string
  $ref?: string
}

export interface Employee {
  id?: string
  externalId?: string
  name?: string
  pis?: string
  mail?: string
  company?: Company
  platformUserName?: string
  biometricPatterns?: any[]
  lastUpdate?: Date
  fences?: any[]
  enabled?: boolean
  dataOrigin?: string
  registrationNumber?: number
  employeeType?: string
  _discriminator?: string
  $ref?: string
}

export interface Company {
  id: string
  cnpj: string
  name: string
  dataOrigin: string
  _discriminator: string
}

export enum FenceState {
  NoFence = 'NO_FENCE'
}

export interface Geolocation {
  id: string
  latitude: number
  longitude: number
  dateAndTime: Date
  _discriminator: GeolocationDiscriminator
}

export enum GeolocationDiscriminator {
  Location = 'location'
}

export enum Mode {
  Single = 'SINGLE'
}

export enum Platform {
  Ios = 'ios'
}

export enum SignatureStatus {
  Checked = 'CHECKED'
}
