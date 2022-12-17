import moment from "moment"


export const dateMoment = (data: Date) => {
    return moment(data).fromNow()
}