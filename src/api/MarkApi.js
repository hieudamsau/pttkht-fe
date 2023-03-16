import { AxiosClient } from "./AxiosClitent";

const MarkApi = {
    getMark(id){
        const url =`/marks/${id} `;
        return AxiosClient.get(url)
    },

}
export default MarkApi