import { AxiosError, AxiosResponse } from "axios"
import { axiosSenior } from "./axios-senior"
import { ClockingEventByActiveUserQueryResponse } from "./dtos/clocking-event-by-active-user-query"
import { mapClockingEventByActiveUserQuery } from "./mappers/clocking-event-by-active-user-query-mapper"

const requiredBody = {
    "filter": {
        "activePlatformUser": true,
        "pageInfo": {
            "page": 0,
            "pageSize": "15"
        },
        "nameSearch": "",
        "sort": {
            "field": null,
            "order": "ASC"
        }
    }
}

export const clockingEventByActiveUserQuery = async (token: string) => {
  try {

    const { data } = await axiosSenior.post<any, AxiosResponse<ClockingEventByActiveUserQueryResponse>>(
      't/senior.com.br/bridge/1.0/rest/hcm/pontomobile/queries/clockingEventByActiveUserQuery',
      requiredBody,
      {
          headers: {
              'Authorization': 'bearer ' + token
          }
      }
    )
    
    return mapClockingEventByActiveUserQuery(data)
  } catch (error) {
    return error as AxiosError
  }
}
